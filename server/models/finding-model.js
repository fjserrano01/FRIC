const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FindingSchema = new Schema(
    {   
        hostName:{type: String},
        ipPort:{type:String, required: false},
        description:{type:String, required: false},
        longDescription:{type: String, required: false},
        status:{type: String, required: false},
        type:{type:String, required: false},
        classification:{type:String, required:false},
        associationToFinding:{type:Array, required:false},
        //evidence:{}
        archiveStatus:{type: Boolean, default: false}
    
    }
)

module.exports = mongoose.model('Finding', FindingSchema)