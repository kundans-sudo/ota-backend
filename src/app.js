const express = require('express');
const app = express();
const otaRoutes = require('./routes/otaRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

// Routes
app.use('/api/ota', otaRoutes);

// Health
app.get('/', (req, res) => res.json({ message: 'OTA backend is running' }));

// Error handler (should be last)
app.use(errorHandler);

module.exports = app;
