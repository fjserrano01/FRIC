const express = require('express')

const FindingCtrl = require('../controllers/finding-ctrl')

const router = express.Router()

router.post('/finding', FindingCtrl.createFinding)
router.put('/finding/:id', FindingCtrl.updateFinding)
router.delete('/finding/:id', FindingCtrl.deleteFinding)
router.get('/finding/:id', FindingCtrl.getFindingById)
router.get('/findings', FindingCtrl.getFindings)
router.get('/finding/', FindingCtrl.getArchivedFindings)
router.get('/findingSystem/:id', FindingCtrl.getFindingBySystem)
router.get('/findingTask/:id', FindingCtrl.getFindingByTask)
router.get('/findingSubtask/:id', FindingCtrl.getFindingBySubtask)

module.exports = router