const mongoose = require('mongoose');


var ObjectId=mongoose.Schema.Types.ObjectId;
const Post = new mongoose.Schema({
      author:  { type: ObjectId, ref: "users"},
      title:  { type: String, required: true},
      body:  { type: String, required: true},
      date:  { type: Date, required: true},
      comments:[{ type: ObjectId, ref: "comments"}],
}, {
  collections: 'posts',
});

module.exports = mongoose.model('posts', Post);
