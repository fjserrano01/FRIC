const express = require('express')
const reportsCtrl = require('../controllers/reports-ctrl')
const router = express.Router()

router.get('/risk',reportsCtrl.riskMatrixReport)
router.get('/erb',reportsCtrl.ERBReport)
router.get('/final', reportsCtrl.finalReport)

module.exports = router