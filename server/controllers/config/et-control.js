const ET = require('../../models/config/event_type')

createET = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const event_type = new ET(body);

    if (!event_type) {
        return res.status(400).json({ success: false, error: err })
    }
    event_type
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: event_type._id,
                message: 'ET created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'ET not created!',
            })    
        })
}
updateET = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    ET.findOne({ _id: req.params.id }, (err, event_type) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'ET not found!',
            })
        }
        ET.name = body.name,
        ET.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: event_type._id,
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

deleteET = async (req, res) => {
    await ET.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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

getETById = async (req, res) => {
    await ET.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getETs = async (req, res) => {
    await ET.find({}, (err, task) => {
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
    createET,
    updateET,
    deleteET,
    getETs,
    getETById
}