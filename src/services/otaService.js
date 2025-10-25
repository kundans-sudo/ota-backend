const { OtaVersion, Device, OtaLog } = require('../models');

exports.checkForOtaUpdate = async (deviceId, stationId, deviceVersion = null) => {
  // deviceVersion optional: if device sends its current version you can compare
  const device = await Device.findOne({ where: { deviceId, stationId } });

  // latest active version
  const latestVersion = await OtaVersion.findOne({
    where: { isActive: true },
    order: [['created_at', 'DESC']]
  });

  if (!latestVersion) return { updateRequired: false, message: 'No OTA version found' };

  // If deviceVersion provided, prefer that comparison; otherwise use device.currentVersion if exists
  const currentDeviceVersion = deviceVersion || (device ? device.currentVersion : null);

  if (currentDeviceVersion && currentDeviceVersion === latestVersion.version) {
    return { updateRequired: false, message: 'Already up to date' };
  }

  // create or update device record (ensure device exists)
  if (!device) {
    await Device.create({
      deviceId,
      stationId,
      currentVersion: currentDeviceVersion || 'unknown',
      syncStatus: 'pending'
    });
  }

  // Log initiation
  await OtaLog.create({
    deviceId,
    stationId,
    version: latestVersion.version,
    status: 'SYNC_INITIATED',
    details: 'Server instructed device to sync'
  });

  return {
    updateRequired: true,
    version: latestVersion.version,
    merchantId: latestVersion.merchantId || null,
    releaseDate: latestVersion.releaseDate || null,
    folderPath: latestVersion.folderPath
  };
};

exports.saveOtaAck = async (deviceId, stationId, version, status, details = null) => {
  // Update device currentVersion and status
  await Device.upsert({
    deviceId,
    stationId,
    currentVersion: version,
    syncStatus: status,
    lastSyncDate: new Date()
  }, {
    where: { deviceId, stationId }
  });

  // Add a log entry
  await OtaLog.create({
    deviceId,
    stationId,
    version,
    status,
    details
  });

  return true;
};
