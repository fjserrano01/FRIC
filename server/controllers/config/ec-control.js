const EC = require('../../models/config/event_classification')

createEC = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const event_classification = new EC(body);

    if (!event_classification) {
        return res.status(400).json({ success: false, error: err })
    }
    event_classification
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: event_classification._id,
                message: 'EC created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'EC not created!',
            })    
        })
}
updateEC = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    EC.findOne({ _id: req.params.id }, (err, event_classification) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'EC not found!',
            })
        }
        EC.name = body.name,
        EC.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: event_classification._id,
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

deleteEC = async (req, res) => {
    await EC.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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

getECById = async (req, res) => {
    await EC.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getECs = async (req, res) => {
    await EC.find({}, (err, task) => {
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
    createEC,
    updateEC,
    deleteEC,
    getECs,
    getECById
}