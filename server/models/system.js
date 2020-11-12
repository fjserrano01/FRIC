
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
        type: Array,
        required: true
    },
    systemRouter: {
        type: Array,
        required: true
    },
    systemSwitch:{
        type: Array,
        required: true
    },
    systemRoom:{
        type : Array,
        requied: true
    },
    testPlan:{
        type: String,
        requied: true,
    },
    systemArchive:{
        type: Boolean,
        default: false
    },
    systemConfidentiality:{
        type: String, //Enumeration
        requied: true 
    },
    systemIntergrity:{
        type: String, //Enumeration
        required: true
    },
    systemAvailability:{
        type: String, //Enumeration
        required: true
    }  
});

module.exports = mongoose.model('System', SystemSchema);