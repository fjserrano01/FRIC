const IL = require('../../models/config/impact_level')

createIL = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const impact_level = new IL(body);

    if (!impact_level) {
        return res.status(400).json({ success: false, error: err })
    }
    impact_level
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: impact_level._id,
                message: 'IL created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'IL not created!',
            })    
        })
}
updateIL = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    IL.findOne({ _id: req.params.id }, (err, impact_level) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'IL not found!',
            })
        }
        IL.name = body.name,
        IL.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: impact_level._id,
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

deleteIL = async (req, res) => {
    await IL.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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

getILById = async (req, res) => {
    await IL.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getILs = async (req, res) => {
    await IL.find({}, (err, task) => {
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
    createIL,
    updateIL,
    deleteIL,
    getILs,
    getILById
}