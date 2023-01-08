const User = require('./User');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  //foreignKey: 'user_id' Don't think needed if in other place per sequalize instructions only needed once?
});

module.exports = { User, BlogPost };
