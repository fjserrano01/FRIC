const mongoose = require('mongoose');
const SubtaskSchema = mongoose.Schema({
  subtaskTitle: {
    type: String,
    required: true
  },
  taskID:{
    type: String,
    required: true
  },
  system:{
    type:String,
    required:true
  },
  subtaskProgress: {
    type: String, //enumeration
  },
  subtaskDescription:{
    type: String,
  },
  subtaskDueDate:{
    type: Date, //Enumeration
    default: Date.now
  },
  subtaskAttachment:{
      type:Number
  },

  subtaskAssociation:{
      type: String
  },
  subtaskTeam: {
    type: String
  },
  subtaskCollaborators:{
    type: String
  },
  archiveStatus:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Subtask', SubtaskSchema);