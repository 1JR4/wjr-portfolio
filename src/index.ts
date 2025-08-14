/**
 * Main application entry point
 * Start simple, add features incrementally
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware - add more as needed
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint - always useful
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Flying Nimbus API',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});