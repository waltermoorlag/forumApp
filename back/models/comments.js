const mongoose = require('mongoose');


var ObjectId=mongoose.Schema.Types.ObjectId;
const Comment = new mongoose.Schema({
  body:  { type: String, required: true, unique: true },
  author:  { type: ObjectId, ref: "users"},
  date :{ type: Date},
  isEdit: {type: Boolean}
}, {
  collections: 'comments',
});

module.exports = mongoose.model('comments', Comment);
