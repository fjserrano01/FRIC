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
    console.log(body)

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
        console.log(task)
        task.taskTitle = body.taskTitle,
        task.taskDescription =body.taskDescription,
        task.system = body.system,
        //task.systemName = body.system,
        task.analyst = body.analyst,
        task.priority = body.priority,
        task.progress = body.progress,
        task.numSubtasks = body.numSubtasks,
        task.numFindings = body.numFindings,
        task.collaborators = body.collaborators,
        task.relatedTasks = body.relatedTasks,
        task.dueDate = body.dueDate
        task.save()
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

updateTaskArchive = async (req, res) => {
    const body = req.body
    console.log(body)

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
        console.log(task)
        task.archiveStatus = body.archiveStatus,
        
        task.save()
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
    await Task.find({archiveStatus:false}, (err, task) => {
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
getTaskBySystem = async (req, res) => {

    await Task.find({ system: req.params.id, archiveStatus: false}, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        console.log("made it here to get task by system")
        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getTaskByDate = async (req, res) => {
    await Task.find({ dueDate: {$gte : new Date()}, analyst:req.params.id, archiveStatus:false}, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getTaskByDateLate = async (req, res) => {
    await Task.find({ dueDate: {$lt : new Date()} , analyst:req.params.id, archiveStatus:false}, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
getArchivedTasks = async (req, res) => {
    await Task.find({archiveStatus:true }, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!task.length) {
            return res
                .status(404)
                .json({ success: false, error: `Task not found` })
        }
        console.log(task)
        return res.status(200).json({ success: true, data: task })
    }).catch(err => console.log(err))
}
module.exports = {
    createTask,
    updateTask,
    updateTaskArchive,
    deleteTask,
    getTasks,
    getTaskById,
    getTaskBySystem, 
    getTaskByDate,
    getTaskByDateLate,
    getArchivedTasks
}