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

Note: syncStatus is currently hardcoded and is not dependent on any file or sync process. It is added only for future use.

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

Note - This API checks whether a device requires an OTA update by comparing its current version with the latest active version.
       If an update is needed, it returns update details (version, folder path, etc.); 
       otherwise, it responds with "Already up to date."

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

Note - This API receives the final acknowledgment from the device after processing an OTA update.
       It updates the device’s version and sync status, and logs the result for tracking.

### 3. Download File.
GET http://localhost:5000/api/ota/download/v3/fuel_cell.zip 

Note - 1. v3 — Directory name where the file is stored
       2. fuel_cell.zip — The file name to be downloaded

Note: Both parameters are required to download the file.

### 4. Check lastes version
GET http://localhost:5000/api/ota/latest
Note: This API basically checks the latest version.

### 5. Add Version and Directory for Local Environment
POST http://localhost:5000/api/ota/ota/add-version


Payload - {
  "version": "V7",
  "merchantId": "M123",
  "releaseDate": "2025-11-24"
}

Note:
The above Add Version API creates the version and directory on the local machine.
You can fetch the latest version using the api/ota/latest API.
After that, you can manually add any file inside the directory that was created.
-------------------------------------------------------------------------------


Note — 
1. Process for Download API and Adding Version & Directory
2. You need to add the latest version (e.g., v1, v2, v3) as required.
3. Always upload the file in the latest version directory.
4. If the latest version (v3) is marked as active, then the API will return v3.
5. If v3 is not active, then it will return the previous active version (e.g., v2).
6. Pass the version and file name in the download API request.
7. We store files in ZIP format for testing purposes.
