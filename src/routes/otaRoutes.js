const express = require('express');
const router = express.Router();
const otaController = require('../controllers/otaController');

router.post('/sync', otaController.syncOTA);
router.post('/ack', otaController.ackOTA);

module.exports = router;
