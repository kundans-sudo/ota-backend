const { DataTypes } = require('sequelize');
const db = require('../config/db');

const OtaVersion = db.define('OtaVersion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  version: { type: DataTypes.STRING(50), allowNull: false },
  merchantId: { type: DataTypes.STRING(50), allowNull: true },
  releaseDate: { type: DataTypes.DATE, allowNull: true },
  folderPath: { type: DataTypes.STRING(255), allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'ota_versions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = OtaVersion;
