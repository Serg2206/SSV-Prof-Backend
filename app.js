const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---

// Security
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Cors (для github.io)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://serg2206.github.io',
  credentials: true
}));

// Body Parsing
app.use(express.json({ limit: '10mb' })); // JSON
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // form-data

// --- Routes ---

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    service: 'SSV-Prof Backend' 
  });
});

// Import routes
const libraryRoutes = require('./src/routes/libraryRoutes');
const internshipRoutes = require('./src/routes/internshipRoutes');
const consultationRoutes = require('./src/routes/consultationRoutes');

// Use routes
app.use('/api/library', libraryRoutes);
app.use('/api/internship', internshipRoutes);
app.use('/api/consultation', consultationRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route Not Found' });
});

// --- Database Connection ---

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// --- Server Start ---

app.listen(PORT, () => {
  console.log(`🚀 SSV-Prof Backend server running on port ${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
