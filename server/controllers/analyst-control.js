const Analyst = require('../models/analyst')

createAnalyst = (req,res) => {
    const body = req.body;
    console.log('Made it to Analyst')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an Analyst"
        })
    }
    const analyst = new Analyst(body);

    if (!analyst) {
        return res.status(400).json({ success: false, error: err })
    }
    analyst
        .save()
        .then(()=>{
            res.json({
                success: true,
                id: analyst._id,
                message: 'Analyst has been created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'Analyst not created!',
            })    
        })
}
updateAnalyst = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Analyst.findOne({ _id: req.params.id }, (err, analyst) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Analyst not found!',
            })
        }
        analyst.eventName = body.eventName,
        analyst.eventDescription =body.eventDescription
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: analyst._id,
                    message: 'Analyst updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Analyst not updated!',
                })
            })
    })
}

deleteAnalyst = async (req, res) => {
    await Analyst.findOneAndDelete({ _id: req.params.id }, (err, analyst) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!analyst) {
            return res
                .status(404)
                .json({ success: false, error: `Analyst not found` })
        }

        return res.status(200).json({ success: true, data: analyst })
    }).catch(err => console.log(err))
}
getAnalyst = async (req, res) => {
    await Analyst.find({}, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!analyst.length) {
            return res
                .status(404)
                .json({ success: false, error: `Analyst not found` })
        }
        return res.status(200).json({ success: true, data: analyst })
    }).catch(err => console.log(err))
}
getAnalystById = async(req, res) => {
    await Analyst.findOne({ initial : req.params.id }, (err, analyst) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        console.log(('Made it Here'))
        return res.status(200).json({ success: true, data: analyst })
    }).catch(err => console.log(err))
}
loginAnalyst = async(req, res)=>{
    await Analyst.findOne({initial : req.body}, (err, analyst)=>{
        if(err){
            return res.status(400).json({success: false})
        }
        return res.status(200).json({success:true, data: analyst})
    }).catch(err => console.log(err))
} 

module.exports = {
    getAnalystById,
    updateAnalyst,
    deleteAnalyst,
    getAnalyst,
    createAnalyst,
    loginAnalyst
}