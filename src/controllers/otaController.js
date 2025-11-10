const path = require("path");
const fs = require("fs");

const otaService = require("../services/otaService");

// POST /api/ota/sync
// body: { deviceId, stationId, deviceVersion? }
exports.syncOTA = async (req, res, next) => {
  try {
    const { deviceId, stationId, deviceVersion } = req.body;
    if (!deviceId || !stationId) {
      return res
        .status(400)
        .json({ message: "deviceId and stationId are required" });
    }

    const result = await otaService.checkForOtaUpdate(
      deviceId,
      stationId,
      deviceVersion
    );
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
      return res.status(400).json({
        message: "deviceId, stationId, version and status are required",
      });
    }

    await otaService.saveOtaAck(deviceId, stationId, version, status, details);
    return res.json({ message: "Acknowledgement received successfully" });
  } catch (err) {
    next(err);
  }
};

// GET /api/ota/download/:version/:filename
exports.downloadOtaFile = async (req, res) => {
  try {
    const { version, filename } = req.params;

    console.log(
      "Download request for version:",
      version,
      "filename:",
      filename
    );
    if (!version || !filename) {
      return res
        .status(400)
        .json({ message: "version and filename are required" });
    }
    console.log("directort name:", __dirname);
    const filePath = path.join(__dirname,"..", "..", "ota_files", version, filename);
    console.log("Resolved file path:", filePath);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Send file to frontend or Pi
    res.download(filePath, filename);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while downloading file" });
  }
};



// get latest version
exports.getLatestVersion = async (req, res, next) => {
  try {
    const latest = await otaService.getLatestOtaVersion();

    if (!latest.version) {
      return res.status(404).json({ message: 'No active OTA version found' });
    }

    return res.json({
      version: latest.version,
      folderPath: latest.folderPath,
      releaseDate: latest.releaseDate,
      isActive: latest.isActive
    });
  } catch (err) {
    next(err);
  }
};