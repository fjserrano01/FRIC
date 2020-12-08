const FIL = require('../../models/config/finding_impact')

createFIL = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const findingImpactLevel = new FIL(body);

    if (!findingImpactLevel) {
        return res.status(400).json({ success: false, error: err })
    }
    findingImpactLevel
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: findingImpactLevel._id,
                message: 'FIL created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'FIL not created!',
            })    
        })
}
updateFIL = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    FIL.findOne({ _id: req.params.id }, (err, findingImpactLevel) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'FIL not found!',
            })
        }
        
        FIL.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: findingImpactLevel._id,
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

deleteFIL = async (req, res) => {
    await FIL.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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

getFILById = async (req, res) => {
    await FIL.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getFILs = async (req, res) => {
    await FIL.find({}, (err, task) => {
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
    createFIL,
    updateFIL,
    deleteFIL,
    getFILs,
    getFILById
}