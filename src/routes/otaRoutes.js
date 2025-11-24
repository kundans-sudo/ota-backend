const express = require('express');
const router = express.Router();
const otaController = require('../controllers/otaController');

router.post('/sync', otaController.syncOTA);
router.post('/ack', otaController.ackOTA);
router.get('/download/:version/:filename', otaController.downloadOtaFile);
router.get('/latest', otaController.getLatestVersion);

router.post("/ota/add-version", otaController.addVersion);


module.exports = router;
