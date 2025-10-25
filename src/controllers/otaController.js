const otaService = require('../services/otaService');

// POST /api/ota/sync
// body: { deviceId, stationId, deviceVersion? }
exports.syncOTA = async (req, res, next) => {
  try {
    const { deviceId, stationId, deviceVersion } = req.body;
    if (!deviceId || !stationId) {
      return res.status(400).json({ message: 'deviceId and stationId are required' });
    }

    const result = await otaService.checkForOtaUpdate(deviceId, stationId, deviceVersion);
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

// POST /api/ota/ack
// body: { deviceId, stationId, version, status, details? }
exports.ackOTA = async (req, res, next) => {
  try {
    const { deviceId, stationId, version, status, details } = req.body;
    if (!deviceId || !stationId || !version || !status) {
      return res.status(400).json({ message: 'deviceId, stationId, version and status are required' });
    }

    await otaService.saveOtaAck(deviceId, stationId, version, status, details);
    return res.json({ message: 'Acknowledgement received successfully' });
  } catch (err) {
    next(err);
  }
};
