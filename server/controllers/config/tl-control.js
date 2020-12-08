const TL = require('../../models/config/threatLvl')

createTL = (req,res) => {
    const body = req.body;
    console.log('Creating FS')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const threatLvl = new TL(body);

    if (!threatLvl) {
        return res.status(400).json({ success: false, error: err })
    }
    threatLvl
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: threatLvl._id,
                message: 'TL created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'TL not created!',
            })    
        })
}
updateTL = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    TL.findOne({ _id: req.params.id }, (err, threatLvl) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'TL not found!',
            })
        }
        TL.name = body.name,
        TL.value = body.value
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: threatLvl._id,
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

deleteTL = async (req, res) => {
    await TL.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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

getTLById = async (req, res) => {
    await TL.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getTLs = async (req, res) => {
    await TL.find({}, (err, task) => {
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
    createTL,
    updateTL,
    deleteTL,
    getTLs,
    getTLById
}