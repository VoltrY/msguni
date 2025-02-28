import { User, Channel, Guild } from '../models/index.js';

export class SocketService {
  constructor(io) {
    this.io = io;
    this.userSockets = new Map(); // user_id -> socket.id mapping
  }

  handleConnection(socket) {
    const userId = socket.user.id;
    this.userSockets.set(userId, socket.id);

    // Kullanıcının olduğu tüm kanallara katıl
    this.joinUserChannels(socket);

    socket.on('disconnect', () => {
      this.userSockets.delete(userId);
      this.handleUserDisconnect(userId);
    });

    // Typing indicator
    socket.on('typing:start', (data) => {
      socket.to(`channel:${data.channelId}`).emit('typing:start', {
        userId,
        channelId: data.channelId
      });
    });

    socket.on('typing:stop', (data) => {
      socket.to(`channel:${data.channelId}`).emit('typing:stop', {
        userId,
        channelId: data.channelId
      });
    });
  }

  async joinUserChannels(socket) {
    try {
      // Kullanıcının üye olduğu guild'leri bul
      const guilds = await Guild.findAll({
        include: [{
          model: User,
          where: { id: socket.user.id },
          attributes: []
        }, {
          model: Channel,
          attributes: ['id']
        }]
      });

      // Her guild'in her kanalına katıl
      for (const guild of guilds) {
        for (const channel of guild.Channels) {
          socket.join(`channel:${channel.id}`);
        }
        socket.join(`guild:${guild.id}`);
      }
    } catch (error) {
      console.error('Error joining channels:', error);
    }
  }

  async handleUserDisconnect(userId) {
    try {
      await User.update(
        { status: 'offline' },
        { where: { id: userId } }
      );

      // Tüm guild'lere kullanıcının çıkış yaptığını bildir
      const guilds = await Guild.findAll({
        include: [{
          model: User,
          where: { id: userId },
          attributes: []
        }]
      });

      for (const guild of guilds) {
        this.io.to(`guild:${guild.id}`).emit('user:status', {
          userId,
          status: 'offline'
        });
      }
    } catch (error) {
      console.error('Error handling disconnect:', error);
    }
  }

  // Mesaj gönderme
  async sendMessage(channelId, message) {
    this.io.to(`channel:${channelId}`).emit('message:new', message);
  }

  // Kullanıcı durumu güncelleme
  async updateUserStatus(userId, status) {
    const user = await User.findByPk(userId);
    if (user) {
      const guilds = await user.getGuilds();
      for (const guild of guilds) {
        this.io.to(`guild:${guild.id}`).emit('user:status', {
          userId,
          status
        });
      }
    }
  }
}