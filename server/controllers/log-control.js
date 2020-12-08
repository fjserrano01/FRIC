const Log = require('../models/log')

createLog = (req,res) => {
    const body = req.body;
    console.log('Made it to Log')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an Log"
        })
    }
    const log = new Log(body);

    if (!log) {
        return res.status(400).json({ success: false, error: err })
    }
    log
        .save()
        .then(()=>{
            res.json({
                success: true,
                message: 'Log has been created!'
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'Log not created!',
            })    
        })
}
getLog = async (req, res) => {
    await Log.find({}, (err, log) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!log.length) {
            return res
                .status(404)
                .json({ success: false, error: `Finding List not found` })
        }
        return res.status(200).json({ success: true, data: log })
    }).catch(err => console.log(err))
}

module.exports = {
    createLog, 
    getLog
    
}