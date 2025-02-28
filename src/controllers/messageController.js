import { Message, User, Channel } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { io } from '../app.js';

export const getMessages = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const { limit = 50, before } = req.query;

    const whereClause = { channel_id: channelId };
    if (before) {
      whereClause.created_at = { [Op.lt]: before };
    }

    const messages = await Message.findAll({
      where: whereClause,
      limit: parseInt(limit),
      order: [['created_at', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'username', 'avatar_url']
      }]
    });

    res.json({
      status: 'success',
      data: { messages }
    });
  } catch (error) {
    next(error);
  }
};

export const createMessage = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const { content, attachments } = req.body;

    // Kanal kontrolü
    const channel = await Channel.findByPk(channelId);
    if (!channel) {
      throw new ApiError(404, 'Channel not found');
    }

    // Mesaj oluştur
    const message = await Message.create({
      content,
      attachments,
      channel_id: channelId,
      user_id: req.user.id
    });

    // Socket.IO ile real-time bildirim gönder
    const messageWithUser = await Message.findByPk(message.id, {
      include: [{
        model: User,
        attributes: ['id', 'username', 'avatar_url']
      }]
    });

    io.to(`channel:${channelId}`).emit('message:new', messageWithUser);

    res.status(201).json({
      status: 'success',
      data: { message: messageWithUser }
    });
  } catch (error) {
    next(error);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);

    if (!message) {
      throw new ApiError(404, 'Message not found');
    }

    if (message.user_id !== req.user.id) {
      throw new ApiError(403, 'You can only edit your own messages');
    }

    const updatedMessage = await message.update(req.body);

    // Socket.IO ile güncelleme bildirimi
    io.to(`channel:${message.channel_id}`).emit('message:update', updatedMessage);

    res.json({
      status: 'success',
      data: { message: updatedMessage }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);

    if (!message) {
      throw new ApiError(404, 'Message not found');
    }

    if (message.user_id !== req.user.id) {
      // Guild yetkisini kontrol et
      const member = await GuildMember.findOne({
        where: {
          guild_id: message.channel.guild_id,
          user_id: req.user.id
        }
      });

      if (!member || !member.roles.includes('admin') && !member.roles.includes('owner')) {
        throw new ApiError(403, 'You do not have permission to delete this message');
      }
    }

    await message.destroy();

    // Socket.IO ile silme bildirimi
    io.to(`channel:${message.channel_id}`).emit('message:delete', { id });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};