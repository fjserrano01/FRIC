const express = require('express');
const router = express.Router();

const EventCtrl = require('../controllers/event-control')


router.post('/event', EventCtrl.createEvent)
router.put('/event/:id', EventCtrl.updateEvent)
router.delete('/event/:id', EventCtrl.deleteEvent)
router.get('/event/:id', EventCtrl.getEventById)
router.get('/events', EventCtrl.getEvents)
router.get('/progress', EventCtrl.trackProgress)

module.exports = router
