const Subtask = require('../models/subtask')

createSubtask = (req,res) => {
    const body = req.body;
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide a subtask"
        })
    }
    const subtask = new Subtask(body);

    if (!subtask) {
        return res.status(400).json({ success: false, error: err })
    }
    subtask
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: subtask._id,
                message: 'subtask created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'Subtask not created!',
            })    
        })
}
updateSubtask = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Subtask.findOne({ _id: req.params.id }, (err, subtask) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Subtask not found!',
            })
        }
        subtask.subtaskTitle = body.subtaskTitle
        subtask.subtaskProgress = body.subtaskProgress
        subtask.subtaskDescription = body.subtaskDescription
        subtask.subtaskDueDate = body.subtaskDueDate
        subtask.subtaskAttachement = body.subtaskAttachement
        subtask.subtaskAssociation = body.subtaskAssociation
        subtask.subtaskTeam = body.subtaskTeam
        subtask.subtaskCollaborators = body.subtaskCollaborators
        subtask.subtaskArchive = body.subtaskArchive
        subtask
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: subtask._id,
                    message: 'Subtask updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Subtask not updated!',
                })
            })
    })
}

deleteSubtask = async (req, res) => {
    await Subtask.findOneAndDelete({ _id: req.params.id }, (err, subtask) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!subtask) {
            return res
                .status(404)
                .json({ success: false, error: `Subtask not found` })
        }

        return res.status(200).json({ success: true, data: subtask})
    }).catch(err => console.log(err))
}
getSubtaskById = async (req, res) => {
    await Subtask.findOne({ _id: req.params.id }, (err, subtask) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: subtask, })
    }).catch(err => console.log(err))
}
getSubtask = async (req, res) => {
    await Subtask.find({subtaskArchive:false}, (err, subtask) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!subtask.length) {
            return res
                .status(404)
                .json({ success: false, error: `Subtask not found` })
        }
        console.log(subtask)
        return res.status(200).json({ success: true, data: subtask })
    }).catch(err => console.log(err))
}
module.exports = {
    createSubtask,
    updateSubtask,
    deleteSubtask,
    getSubtask,
    getSubtaskById
}