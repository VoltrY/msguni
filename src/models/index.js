import User from './User.js';
import Guild from './Guild.js';
import Channel from './Channel.js';
import Message from './Message.js';
import GuildMember from './GuildMember.js';

// İlişkileri tanımlayalım
Guild.belongsTo(User, { as: 'owner', foreignKey: 'owner_id' });
Guild.hasMany(Channel, { foreignKey: 'guild_id' });
Channel.belongsTo(Guild, { foreignKey: 'guild_id' });
Channel.hasMany(Message, { foreignKey: 'channel_id' });
Message.belongsTo(Channel, { foreignKey: 'channel_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });

// Guild Members ilişkileri
Guild.belongsToMany(User, {
  through: GuildMember,
  foreignKey: 'guild_id'
});

User.belongsToMany(Guild, {
  through: GuildMember,
  foreignKey: 'user_id'
});

export {
  User,
  Guild,
  Channel,
  Message,
  GuildMember
};