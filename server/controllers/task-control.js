const Task = require('../models/task')

createTask = (req,res) => {
    const body = req.body;
    console.log('Made it Here')
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error : "You must provide an event"
        })
    }
    const task = new Task(body);

    if (!task) {
        return res.status(400).json({ success: false, error: err })
    }
    task
        .save()
        .then(()=>{
            return res.status(201).json({
                success: true,
                id: task._id,
                message: 'Event created!',
            })
        }).catch(error =>{
            return res.status(400).json({
                error,
                message: 'Event not created!',
            })    
        })
}
updateTask = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Task.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Event not found!',
            })
        }
        task.taskTitle = body.title,
        task.taskDescription =body.description,
        task.system = body.system,
        task.analyst = body.analyst,
        task.priority = body.priority,
        task.progress = body.progress,
        task.numSubtasks = body.subtasks,
        task.numFindings = body.findings,
        task.collaborators = body.collaborators,
        task.relatedTasks = body.relatedTasks,
        task.dueDate = body.dueDate
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: task._id,
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

deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id }, (err, task) => {
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
getTaskById = async (req, res) => {
    await Task.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}

getTasks = async (req, res) => {
    await Task.find({}, (err, task) => {
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
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTaskById
}