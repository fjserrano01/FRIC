const mongoose = require('mongoose');
const TaskSchema = mongoose.Schema({
  taskTitle: {
    type: String,
    required: true
  },
  taskDescription: {
    type: String,
    required:true
  },
  system:{
    type: String //Enumeration
  },
  // systemName:{
  //   type:String
  // },
  analyst:{
      type:String
  },
  priority:{
      type: String, //Enumeration
      required:true
  },
  progress: {
    type: String
  },
  numSubtasks:{
    type: Number
  },
  numFindings: {
    type: Number
  },
  collaborators:{
    type: String
  },
  relatedTasks:{
    type: String
  }, 
  dueDate:{
    type: Date
  },
  archiveStatus:{
    type: Boolean,
    default:false
  }
});

module.exports = mongoose.model('Task', TaskSchema);