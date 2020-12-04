const express = require('express');
const analystCtrl = require('../controllers/analyst-control');
const router = express.Router();

router.get('/analyst/:id', analystCtrl.getAnalystById)
router.post('/analyst', analystCtrl.createAnalyst)
router.put('/analyst/:id', analystCtrl.updateAnalyst)
router.delete('/analyst', analystCtrl.deleteAnalyst)
router.get('/analysts', analystCtrl.getAnalysts)
router.get('/analystLogin', analystCtrl.loginAnalyst)

module.exports = router