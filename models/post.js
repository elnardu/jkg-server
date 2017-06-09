const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Укажите заголовок'
  },
  shortdescription: {
    type: String,
    required: 'Укажите короткое описание'
  },
  description: {
    type: String,
    required: 'Укажите полное описание'
  },
  salary: [Number],
  tags: [String],
  userid: mongoose.Schema.Types.ObjectId
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
