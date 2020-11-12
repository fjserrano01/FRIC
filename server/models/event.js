const mongoose = require('mongoose');
const EventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required:true
  },
  eventType:{
    type: String, //Enumeration
    required:true
  },
  eventVersion:{
      type:Number,
      required : true
  },

  eventClassification:{
      type: String, //Enumeration
      required:true
  },
  eventDate: {
    type: Date,
    default : Date.now
  },
  eventCustomer:{
    type: String,
    required:true
  },
  eventOrgName:{
    type: String,
    required: true
  },
  eventSecClass:{
    type: String,
    required: true
  },
  eventDeclassDate: {
    type: Date,
    default: Date.now
  },
  eventArchive:{
    type: Boolean,
    defult : false
  },
  eventTeam:{
    type: [String],
    required:true
  },
  deriveedFrom:{
    type: String
  }
});

module.exports = mongoose.model('Event', EventSchema);
