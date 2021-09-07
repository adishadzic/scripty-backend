const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    scriptName: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    scriptContent: {
      type: String,
      required: true,
    },
  },
  { collection: 'posts' }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
