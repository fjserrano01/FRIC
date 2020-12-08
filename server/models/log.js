const mongoose = require('mongoose');
const LogSchema = mongoose.Schema({
  initials:{
    type: String
  },
  description:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Log', LogSchema);