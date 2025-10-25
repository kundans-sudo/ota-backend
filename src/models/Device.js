const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Device = db.define('Device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deviceId: { type: DataTypes.STRING(50), allowNull: false },
  stationId: { type: DataTypes.STRING(50), allowNull: false },
  currentVersion: { type: DataTypes.STRING(20), defaultValue: 'v1' },
  lastSyncDate: { type: DataTypes.DATE },
  syncStatus: { type: DataTypes.STRING(20), defaultValue: 'pending' }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Device;
