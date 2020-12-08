const Finding = require('../models/finding-model')

createFinding = (req,res) => {
    const body = req.body
    console.log('in finding-ctrl')
    console.log(body)

    if(!body) {
        console.log('Flag 1')
        return res.status(400).json({
            success: false,
            error: 'Unmet requirements for configuration'
        })
    }

    const finding = new Finding(body)
    if(!finding){
        console.log("finding not made line 18")
        return res.status(400).json({ success: false, error: err })
    }

    finding.save().then(()=> {
        console.log('finding created')
        return res.status(201).json({
            success: true,
            id: finding._id,
            message: 'Finding created',
        })
    })
    .catch(error =>{
        return res.status(400).json({
            error,
            message: 'Finding not created!',
        })
    })
}

updateFinding = async (req, res) => {
    const body = req.body

    if(!body){
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Finding.findOne({ _id: req.params.id}, (err, finding) =>{
        if (err) {
            return res.status(404).json({
                err,
                message: 'Finding not found!',
            })
    }
    finding.ipPort = body.ipPort
    //missing
    .save().then(()=>{
        return res.status(200).json({
            success: true,
            id: movie._id,
            message: 'Finding updated!',
        })
    })
    .catch(error => {
        return res.status(404).json({
            error,
            message: 'Movie not updated!',
        })
    })
})

}


updateFindingArchive = async (req, res) => {
    const body = req.body
    console.log(body)

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Finding.findOne({ _id: req.params.id }, (err, finding) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Event not found!',
            })
        }
        console.log(finding)
        finding.archiveStatus = body.archiveStatus,
        
        finding.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: task._id,
                    message: 'Event updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Event not updated!',
                })
            })
    })
}


deleteFinding = async (req, res) => {
    await Finding.findOneAndDelete({ _id: req.params.id }, (err, finding) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!finding) {
            return res
                .status(404)
                .json({ success: false, error: `Finding not found` })
        }

        return res.status(200).json({ success: true, data: finding })
    }).catch(err => console.log(err))
}

getFindingById = async (req, res) =>{
    await Finding.findOne({ _id: req.params.id, archiveStatus:false}, (err, finding) =>{
        if (err){
            return res.status(400).json({ success: false, error: err })
        }
        if(!finding){
            return res.status(404).json({
                success:false, error: 'Finding not found'
            })
        }
        return res.status(200).json({ success: true, data: finding})
    }).catch(err => console.log(err))
}

getFindings = async (req, res) => {
    console.log('Made it Here Hello world')
    await Finding.find({archiveStatus:false}, (err, finding) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!finding.length) {
            return res
                .status(404)
                .json({ success: false, error: `Finding List not found` })
        }
        return res.status(200).json({ success: true, data: finding })
    }).catch(err => console.log(err))
}
getArchivedFindings = async (req, res) => {
    await Finding.find({archiveStatus:true }, (err, finding) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!finding.length) {
            return res
                .status(404)
                .json({ success: false, error: `Finding not found` })
        }
        console.log(finding)
        return res.status(200).json({ success: true, data: finding })
    }).catch(err => console.log(err))
}
getFindingBySystem = async (req, res) => {
    await Finding.find({ system: req.params.id, task: "", subtask: "", archiveStatus: false }, (err, finding) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: finding })
    }).catch(err => console.log(err))
}
getFindingByTask = async (req, res) => {
    await Finding.find({ task: req.params.id, subtask:"", archiveStatus: false }, (err, finding) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: finding })
    }).catch(err => console.log(err))
}
getFindingBySubtask = async (req, res) => {
    await Finding.find({ subtask: req.params.id, archiveStatus: false}, (err, finding) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: finding })
    }).catch(err => console.log(err))
}

module.exports = {
    createFinding,
    updateFinding,
    deleteFinding,
    getFindingById,
    getFindings,
    updateFindingArchive,
    getArchivedFindings,
    getFindingBySystem,
    getFindingByTask,
    getFindingBySubtask
}