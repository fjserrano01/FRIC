const express = require('express');
const logCtrl = require('../controllers/log-control');
const router = express.Router();


router.post('/log', logCtrl.createLog)
router.get('/log', logCtrl.getLog)



module.exports = router