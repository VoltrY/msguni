import { logger } from '../utils/logger.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const setupSocketIO = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.user.id}`);

    // Kullanıcı durumunu güncelle
    User.update({ status: 'online' }, { where: { id: socket.user.id } });

    socket.on('message:send', async (data) => {
      // Mesaj gönderme işlemleri
    });

    socket.on('user:typing', (data) => {
      socket.to(data.channelId).emit('user:typing', {
        userId: socket.user.id,
        channelId: data.channelId
      });
    });

    socket.on('disconnect', async () => {
      logger.info(`User disconnected: ${socket.user.id}`);
      await User.update({ status: 'offline' }, { where: { id: socket.user.id } });
    });
  });
};