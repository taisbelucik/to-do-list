const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    require: true,
  },
  check: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  usuario: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
