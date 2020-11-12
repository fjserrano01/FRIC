const mongoose = require('mongoose');
const AnalystSchema = mongoose.Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  initial:{
    type: String,
    required: true
  },
  title:{
    type: [String]
  },
  Role: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Analyst', AnalystSchema);