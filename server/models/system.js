
const mongoose = require('mongoose');
const SystemSchema = mongoose.Schema({
    systemName: {
        type: String,
        required: true
    },
    systemDescription: {
        type: String
    },
    systemLocation:{
        type: [String]
    },
    systemRouter: {
        type: [String]
    },
    systemSwitch:{
        type: [String]
    },
    systemRoom:{
        type : [String]
    },
    testPlan:{
        type: String
    },
    systemArchive:{
        type: Boolean,
        default: false
    },
    systemConfidentiality:{
        type: String, //Enumeration
    },
    systemIntergrity:{
        type: String //Enumeration
    },
    systemAvailability:{
        type: String //Enumeration
    }  
});

module.exports = mongoose.model('System', SystemSchema);