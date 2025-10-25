const { DataTypes } = require('sequelize');
const db = require('../config/db');

const OtaLog = db.define('OtaLog', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deviceId: { type: DataTypes.STRING(50), allowNull: true },
  stationId: { type: DataTypes.STRING(50), allowNull: true },
  version: { type: DataTypes.STRING(50), allowNull: true },
  status: { type: DataTypes.STRING(50), allowNull: true }, // success / fail / initiated
  details: { type: DataTypes.TEXT, allowNull: true }
}, {
  tableName: 'ota_logs',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = OtaLog;
