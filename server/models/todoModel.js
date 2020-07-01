const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
})

const Todo = mongoose.model('TodoList', todoSchema);

module.exports = Todo