# OTA Backend

## Setup Instructions

1. Clone the repository
   git clone https://github.com/kundans-sudo/ota-backend.git
   cd ota-backend

2. Install dependencies
   npm install

3. Create the database
   Create a MySQL database named ota_db.

4. Run the backend project
   npm start
   The server will run on http://localhost:5000 by default.

## Database Seed

### Insert sample devices
INSERT INTO devices (deviceId, stationId, currentVersion, lastSyncDate, syncStatus, created_at, updated_at) 
VALUES 
('D001', 'S001', 'v1', NOW(), 'pending', NOW(), NOW()),
('D002', 'S002', 'v1', NOW(), 'pending', NOW(), NOW()),
('D003', 'S003', 'v2', NOW(), 'success', NOW(), NOW());

### Insert OTA versions
INSERT INTO ota_versions (version, merchantId, releaseDate, folderPath, isActive, created_at, updated_at) 
VALUES 
('v1', '12345', '2025-10-01', './ota_files/v1', TRUE, NOW(), NOW()),
('v2', '12345', '2025-10-25', './ota_files/v2', TRUE, NOW(), NOW()),
('v3', '12345', '2025-11-01', './ota_files/v3', FALSE, NOW(), NOW());

## API Endpoints

### 1. Sync OTA
POST http://localhost:5000/api/ota/sync

Request body example:
{
  "deviceId": "D000001",
  "stationId": "S00001",
  "deviceVersion": ""
}

### 2. Acknowledge OTA
POST http://localhost:5000/api/ota/ack

Request body example:
{
  "deviceId": "D001",
  "stationId": "S001",
  "version": "v2",
  "status": "success",
  "details": "All files synced successfully"
}
