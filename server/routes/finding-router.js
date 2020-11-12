const express = require('express')

const FindingCtrl = require('../controllers/finding-ctrl')

const router = express.Router()

router.post('/finding', FindingCtrl.createFinding)
router.put('/finding/:id', FindingCtrl.updateFinding)
router.delete('/finding/:id', FindingCtrl.deleteFinding)
router.get('/finding/:id', FindingCtrl.getFindingById)
router.get('/findings', FindingCtrl.getFindings)

module.exports = router