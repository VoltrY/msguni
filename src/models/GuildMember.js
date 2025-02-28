import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const GuildMember = sequelize.define('GuildMember', {
  user_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  guild_id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  nickname: {
    type: DataTypes.STRING(50),
    defaultValue: null
  },
  roles: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default GuildMember;