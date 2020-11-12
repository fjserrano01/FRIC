const Event = require('../models/event')
const Task = require('../models/task')

createEvent = (req,res) => {
    const body = req.body;

    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const event = new Event(body);

    if (!event) {
        return res.status(400).json({ success: false, error: err })
    }
    event
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: event._id,
                message: 'Event created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'Event not created!',
            })    
        })
}
updateEvent = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Event.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Event not found!',
            })
        }
        event.eventName = body.eventName
        event.eventDescription =body.eventDescription
        event.eventType = body.eventType
        event.eventVersion = body.eventVersion
        event.eventClassification = body.eventClassification
        event.eventDate = body.eventDate
        event.eventCustomer = body.eventCustomer
        event.eventOrgName = body.eventOrgName
        event.eventSecClass = body.eventSecClass
        event.eventDeclassDate = body.eventDeclassDate
        event.eventArchive = body.eventArchive
        event.eventTeam = body.eventTeam
        event.derivedFrom = body.derivedFrom
        event
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: event._id,
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

deleteEvent = async (req, res) => {
    await Event.findOneAndDelete({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!event) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }

        return res.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}
getEventById = async (req, res) => {
    await Event.findOne({ _id: req.params.id }, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}
getEvents = async (req, res) => {
    await Event.find({}, (err, event) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!event.length) {
            return res
                .status(404)
                .json({ success: false, error: `Event not found` })
        }
        return res.status(200).json({ success: true, data: event })
    }).catch(err => console.log(err))
}
trackProgress = async (req,res) => {
    complete = await Task.count({progress : 'complete'}, (err) =>{
        if(err){
            return res.status(400).json({success :false, error: err})
        }
    })
    notStarted = await Task.count({progress : 'Not Started'}, (err) =>{
        if(err){
            return res.status(400).json({success:false, error: err})
        }
    })
    inProgress = await Task.count({progress : 'Assigned'}, (err) =>{
        if(err){
            return res.status(400).json({success: false, error: err})
        }
    })
    totalTasks = await Task.count({}, (err) => {
        if(err){
            return res.status(400).json({success: false, error: err})
        }
    })
    var totalProgress = {"complete" : complete, "notStarted" : notStarted, "inProgress" : inProgress, "total" : totalTasks}
        return res.status(200).json({success: true, data:totalProgress})
        .catch(err => console.log(err))
}
module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventById,
    trackProgress,
}