const FT = require('../../models/config/findingType')

createFT = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const findingType = new FT(body);

    if (!findingType) {
        return res.status(400).json({ success: false, error: err })
    }
    findingType
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: findingType._id,
                message: 'FT created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'FT not created!',
            })    
        })
}
updateFT = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    FT.findOne({ _id: req.params.id }, (err, findingType) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'FT not found!',
            })
        }
        FT.name = body.name,
        FT.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: findingType._id,
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

deleteFT = async (req, res) => {
    await FT.findOneAndDelete({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!task) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

getFTById = async (req, res) => {
    await FT.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getFTs = async (req, res) => {
    await FT.find({}, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!task.length) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }
        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
module.exports = {
    createFT,
    updateFT,
    deleteFT,
    getFTs,
    getFTById
}