const express = require('express');
const router = express.Router();
const SystemCtrl = require('../controllers/system-ctrl');



router.post('/system', SystemCtrl.createSystem)
router.put('/system/:id', SystemCtrl.updateSystem)
router.delete('/system/:id', SystemCtrl.deleteSystem)
router.get('/system/:id', SystemCtrl.getSystemtById)
router.get('/systems', SystemCtrl.getSystems)

module.exports = router
