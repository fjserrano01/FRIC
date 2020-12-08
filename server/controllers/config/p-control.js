const P = require('../../models/config/posture')

createP = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const posture = new P(body);

    if (!posture) {
        return res.status(400).json({ success: false, error: err })
    }
    posture
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: posture._id,
                message: 'P created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'P not created!',
            })    
        })
}
updateP = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    P.findOne({ _id: req.params.id }, (err, posture) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'P not found!',
            })
        }
        P.name = body.name,
        P.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: posture._id,
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

deleteP = async (req, res) => {
    await P.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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

getPById = async (req, res) => {
    await P.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getPs = async (req, res) => {
    await P.find({}, (err, task) => {
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
    createP,
    updateP,
    deleteP,
    getPs,
    getPById
}