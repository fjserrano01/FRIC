const express = require('express');
const router = express.Router();

const SubtaskCtrl = require('../controllers/subtask-control')


router.post('/subtask', SubtaskCtrl.createSubtask)
router.put('/subtask/:id', SubtaskCtrl.updateSubtask)
router.put('/subtaskarch/:id', SubtaskCtrl.updateSubtaskArchive)
router.delete('/subtask/:id', SubtaskCtrl.deleteSubtask)
router.get('/subtask/:id', SubtaskCtrl.getSubtaskById)
router.get('/subtasks', SubtaskCtrl.getSubtask)
router.get('/subtasktask/:id', SubtaskCtrl.getSubtaskByTask)
router.get('/subtask/:id', SubtaskCtrl.getArchivedSubtasks)

module.exports = router