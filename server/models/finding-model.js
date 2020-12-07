const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Finding = new Schema(
    {
        hostName:{type:String, required: false},
        ipPort:{type:String, required: false},
        description:{type:String, required: false},
        longDescription:{type: String, required: false},
        status:{type: String, required: false},
        analyst:{type:String},
        system:{
            type: String //Enumeration
          },
          task:{
            type: String //Enumeration
          },
          subtask:{
            type: String //Enumeration
          },
        type:{type:String, required: false},
        classification:{type:String, required:false},
        associationToFinding:{type:Array, required:false},
        posture:{type:String},
        confidentialityImpact:{type:String},
        integrityImpact:{type:String},
        availabilityImpact:{type:String},
        countermeasureValue:{type:Number},
        impactLevel:{type:String},
        impactLevelDescription:{type:String,},
        threatRelevance:{type:String},
        catScore:{type:String},
        catValue:{type:Number},
        vulnScore:{type:Number},
        vs:{type:String},
        likelihood:{type:String},
        risk:{type:String},
        mitigation:{type:String},
        attachemnt:{type:String},
        archiveStatus:{type: Boolean, default: false},
        files:{type: Array}
    }
)

module.exports = mongoose.model('findings', Finding)