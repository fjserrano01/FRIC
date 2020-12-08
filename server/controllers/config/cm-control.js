const CM = require('../../models/config/counter_measure')

createCM = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const counter_measure = new CM(body);

    if (!counter_measure) {
        return res.status(400).json({ success: false, error: err })
    }
    counter_measure
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: counter_measure._id,
                message: 'CM created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'CM not created!',
            })    
        })
}
updateCM = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    CM.findOne({ _id: req.params.id }, (err, counter_measure) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'CM not found!',
            })
        }
        CM.name = body.name,
        CM.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: counter_measure._id,
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

deleteCM = async (req, res) => {
    await CM.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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

getCMById = async (req, res) => {
    await CM.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getCMs = async (req, res) => {
    await CM.find({}, (err, task) => {
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
    createCM,
    updateCM,
    deleteCM,
    getCMs,
    getCMById
}