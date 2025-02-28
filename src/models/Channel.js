import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Channel = sequelize.define('Channel', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  guild_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  type: {
    type: DataTypes.ENUM('text', 'voice'),
    defaultValue: 'text'
  }
});

export default Channel;