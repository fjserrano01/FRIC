const System = require('../models/system')

createSystem = (req,res) => {
    const body = req.body;
    console.log("made it here")
    console.log(body)

    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an system"
        })
    }
    const system = new System(body);

    if (!system) {
        return res.status(400).json({ success: false, error: err })
    }
    system
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: system._id,
                message: 'System created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'System not created!',
            })    
        })
}
updateSystem = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    System.findOne({ _id: req.params.id }, (err, system) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'System not found!',
            })
        }
        system.systemName = body.systemName
        system.systemDescription =body.systemDescription
        system.systemLocation = body.systemLocation
        system.systemRouter = body.systemRouter
        system.systemSwitch = body.systemSwitch
        system.systemRoom = body.systemRoom
        system.testPlan = body.testPlan
        system.systemArchive = body.systemArchive
        system.systemConfidentiality = body.systemConfidentiality
        system.systemIntergrity = body.systemIntergrity
        system.systemAvailability = body.systemAvailability
        system
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: system._id,
                    message: 'System updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'System not updated!',
                })
            })
    })
}

updateSystemArchive = async (req, res) => {
    const body = req.body
    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    System.findOne({ _id: req.params.id }, (err, system) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'system not found!',
            })
        }
        console.log(system)
        system.archiveStatus = body.archiveStatus,
        
        system.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: system._id,
                    message: 'system updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'system not updated!',
                })
            })
    })
}
deleteSystem = async (req, res) => {
    await System.findOneAndDelete({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!event) {
            return res
                .status(404)
                .json({ success: false, error: `System not found` })
        }

        return res.status(200).json({ success: true, data: system})
    }).catch(err => console.log(err))
}
getSystemtById = async (req, res) => {
    await System.findOne({ _id: req.params.id }, (err, system) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: system, })
    }).catch(err => console.log(err))
}
getSystems = async (req, res) => {
    await System.find({archiveStatus:false}, (err, system) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!system.length) {
            return res
                .status(404)
                .json({ success: false, error: `System not found` })
        }
        console.log(system)
        return res.status(200).json({ success: true, data: system })
    }).catch(err => console.log(err))
}
getArchivedSystems = async (req, res) => {
    await System.find({archiveStatus:true }, (err, system) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!system.length) {
            return res
                .status(404)
                .json({ success: false, error: `System not found` })
        }
        console.log(system)
        return res.status(200).json({ success: true, data: system })
    }).catch(err => console.log(err))
}

module.exports = {
    createSystem,
    updateSystem,
    updateSystemArchive,
    deleteSystem,
    getSystems,
    getSystemtById,
    getArchivedSystems
}