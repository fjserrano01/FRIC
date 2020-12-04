const express = require('express');
const router = express.Router();

const TaskCtrl = require('../controllers/task-control')


router.post('/task', TaskCtrl.createTask)
router.put('/task/:id', TaskCtrl.updateTask)
router.put('/taskarch/:id', TaskCtrl.updateTaskArchive)
router.delete('/task/:id', TaskCtrl.deleteTask)
router.get('/task/:id', TaskCtrl.getTaskById)
router.get('/tasks', TaskCtrl.getTasks)
router.get('/tasksystem/:id', TaskCtrl.getTaskBySystem)
router.get('/tasksdate/:id', TaskCtrl.getTaskByDate)
router.get('/tasksdatelate/:id', TaskCtrl.getTaskByDateLate)
router.get('/task/', TaskCtrl.getArchivedTasks)

module.exports = router