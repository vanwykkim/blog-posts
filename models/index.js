const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  //foreignKey: 'user_id' Don't think needed if in other place per sequalize instructions only needed once?
});


//FIXME: verify comment relationships are correct below
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  //foreignKey: 'user_id' Don't think needed if in other place per sequalize instructions only needed once?
});

BlogPost.hasMany(Comment, {
  foreignKey: 'blogPost_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(BlogPost, {
  //foreignKey: 'blogPost_id' Don't think needed if in other place per sequalize instructions only needed once?
});

module.exports = { User, BlogPost, Comment };
