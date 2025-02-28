import { Channel, Message, User, GuildMember } from '../models/index.js';
import { Op } from 'sequelize';
import { ApiError } from '../utils/ApiError.js';
import { sequelize } from '../config/database.js';

export const createChannel = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const { guildId } = req.params;

    // Guild üyeliğini kontrol et
    const member = await GuildMember.findOne({
      where: {
        guild_id: guildId,
        user_id: req.user.id
      }
    });

    if (!member || !member.roles.includes('admin') && !member.roles.includes('owner')) {
      throw new ApiError(403, 'You do not have permission to create channels');
    }

    const channel = await Channel.create({
      name,
      type,
      guild_id: guildId
    });

    res.status(201).json({
      status: 'success',
      data: { channel }
    });
  } catch (error) {
    next(error);
  }
};

export const getChannels = async (req, res, next) => {
  try {
    const { guildId } = req.params;

    const channels = await Channel.findAll({
      where: { guild_id: guildId },
      include: [{
        model: Message,
        limit: 1,
        order: [['created_at', 'DESC']],
        include: [{
          model: User,
          attributes: ['id', 'username', 'avatar_url']
        }]
      }]
    });

    res.json({
      status: 'success',
      data: { channels }
    });
  } catch (error) {
    next(error);
  }
};

export const updateChannel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findByPk(id);

    if (!channel) {
      throw new ApiError(404, 'Channel not found');
    }

    // Yetki kontrolü
    const member = await GuildMember.findOne({
      where: {
        guild_id: channel.guild_id,
        user_id: req.user.id
      }
    });

    if (!member || !member.roles.includes('admin') && !member.roles.includes('owner')) {
      throw new ApiError(403, 'You do not have permission to update this channel');
    }

    const updatedChannel = await channel.update(req.body);

    res.json({
      status: 'success',
      data: { channel: updatedChannel }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteChannel = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;
    const channel = await Channel.findByPk(id);

    if (!channel) {
      throw new ApiError(404, 'Channel not found');
    }

    // Yetki kontrolü
    const member = await GuildMember.findOne({
      where: {
        guild_id: channel.guild_id,
        user_id: req.user.id
      }
    });

    if (!member || !member.roles.includes('admin') && !member.roles.includes('owner')) {
      throw new ApiError(403, 'You do not have permission to delete this channel');
    }

    await channel.destroy({ transaction: t });
    await t.commit();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};