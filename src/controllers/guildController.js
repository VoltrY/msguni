import { Guild, Channel, GuildMember, User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { sequelize } from '../config/database.js';

export const createGuild = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { name, description } = req.body;

    const guild = await Guild.create({
      name,
      description,
      owner_id: req.user.id
    }, { transaction: t });

    // Create default channel
    await Channel.create({
      guild_id: guild.id,
      name: 'general',
      type: 'text'
    }, { transaction: t });

    // Add owner as member
    await GuildMember.create({
      user_id: req.user.id,
      guild_id: guild.id,
      roles: ['owner']
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      status: 'success',
      data: { guild }
    });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

export const getGuilds = async (req, res, next) => {
  try {
    const guilds = await Guild.findAll({
      include: [{
        model: User,
        as: 'members',
        attributes: ['id', 'username', 'avatar_url', 'status'],
        through: { attributes: ['nickname', 'roles'] }
      }]
    });

    res.json({
      status: 'success',
      data: { guilds }
    });
  } catch (error) {
    next(error);
  }
};

export const getGuild = async (req, res, next) => {
  try {
    const guild = await Guild.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'username', 'avatar_url', 'status'],
          through: { attributes: ['nickname', 'roles'] }
        },
        {
          model: Channel,
          attributes: ['id', 'name', 'type']
        }
      ]
    });

    if (!guild) {
      throw new ApiError(404, 'Guild not found');
    }

    res.json({
      status: 'success',
      data: { guild }
    });
  } catch (error) {
    next(error);
  }
};

export const updateGuild = async (req, res, next) => {
  try {
    const guild = await Guild.findByPk(req.params.id);

    if (!guild) {
      throw new ApiError(404, 'Guild not found');
    }

    if (guild.owner_id !== req.user.id) {
      throw new ApiError(403, 'Only the owner can update the guild');
    }

    const updatedGuild = await guild.update(req.body);

    res.json({
      status: 'success',
      data: { guild: updatedGuild }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteGuild = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const guild = await Guild.findByPk(req.params.id);

    if (!guild) {
      throw new ApiError(404, 'Guild not found');
    }

    if (guild.owner_id !== req.user.id) {
      throw new ApiError(403, 'Only the owner can delete the guild');
    }

    await guild.destroy({ transaction: t });
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