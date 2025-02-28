import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import guildRoutes from './guildRoutes.js';
import channelRoutes from './channelRoutes.js';
import messageRoutes from './messageRoutes.js';

export const setupRoutes = (app) => {
  const router = Router();

  router.use('/auth', authRoutes);
  router.use('/users', userRoutes);
  router.use('/guilds', guildRoutes);
  router.use('/channels', channelRoutes);
  router.use('/messages', messageRoutes);

  app.use('/api', router);
};