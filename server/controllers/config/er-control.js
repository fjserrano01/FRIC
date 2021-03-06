const ER = require('../../models/config/event_rule')

createER = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const event_rule = new ER(body);

    if (!event_rule) {
        return res.status(400).json({ success: false, error: err })
    }
    event_rule
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: event_rule._id,
                message: 'ER created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'ER not created!',
            })    
        })
}
updateER = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    ER.findOne({ _id: req.params.id }, (err, event_rule) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'ER not found!',
            })
        }
        ER.name = body.name,
        ER.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: event_rule._id,
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

deleteER = async (req, res) => {
    await ER.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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

getERById = async (req, res) => {
    await ER.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getERs = async (req, res) => {
    await ER.find({}, (err, task) => {
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
    createER,
    updateER,
    deleteER,
    getERs,
    getERById
}