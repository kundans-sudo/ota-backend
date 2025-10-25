// central model hub
const sequelize = require('../config/db');

const OtaVersion = require('./OtaVersion');
const Device = require('./Device');
const OtaLog = require('./OtaLog');

// Note: models were defined by requiring them (they used the same sequelize instance).
// If you prefer function-based model initialization (passing sequelize), we can refactor.


// Define associations if needed (example: Device currentVersion is a string, so not a FK here).
// If you want to use a foreign key, modify models accordingly.

// Export
module.exports = {
  sequelize,
  OtaVersion,
  Device,
  OtaLog
};
