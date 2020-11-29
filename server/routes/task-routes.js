const express = require('express');
const router = express.Router();

const TaskCtrl = require('../controllers/task-control')


router.post('/task', TaskCtrl.createTask)
router.put('/task/:id', TaskCtrl.updateTask)
router.delete('/task/:id', TaskCtrl.deleteTask)
router.get('/task/:id', TaskCtrl.getTaskById)
router.get('/tasks', TaskCtrl.getTasks)
router.get('/tasksystem/:id', TaskCtrl.getTaskBySystem)

module.exports = router