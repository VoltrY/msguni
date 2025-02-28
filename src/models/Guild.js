import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Guild = sequelize.define('Guild', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  owner_id: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  icon_url: {
    type: DataTypes.STRING(255),
    defaultValue: null
  }
});

export default Guild;