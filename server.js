const express = require('express');
const path = require('path');
const http = require('http');
const net = require('net');

// Port management configuration
const PORT_CONFIG = {
    defaultPort: 5000,
    portRange: { start: 5000, end: 5010 }
};

// Function to check if a port is available
function isPortAvailable(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false);
            } else {
                resolve(false);
            }
        });
        
        server.once('listening', () => {
            server.close();
            resolve(true);
        });
        
        server.listen(port);
    });
}

// Function to find an available port
async function findAvailablePort() {
    for (let port = PORT_CONFIG.portRange.start; port <= PORT_CONFIG.portRange.end; port++) {
        const available = await isPortAvailable(port);
        if (available) {
            return port;
        }
    }
    throw new Error('No available ports found in the specified range');
}

// Initialize Express app
const app = express();

// Middleware for CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files from 'out' directory
app.use(express.static(path.join(__dirname, 'out')));

// Fallback route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

// Start server with port management
async function startServer() {
    try {
        const port = await findAvailablePort();
        
        const server = app.listen(port, () => {
            console.log('\\n🚀 Server started successfully!');
            console.log('╔════════════════════════════════════════╗');
            console.log('║                                        ║');
            console.log(`║   Local:    http://localhost:${port}     ║`);
            console.log('║                                        ║');
            console.log('║   Press Ctrl+C to stop the server     ║');
            console.log('║                                        ║');
            console.log('╚════════════════════════════════════════╝\\n');
            console.log('📡 Port Management Active:');
            console.log(`   - Using port: ${port}`);
            console.log(`   - Port range: ${PORT_CONFIG.portRange.start}-${PORT_CONFIG.portRange.end}`);
            console.log('\\n📝 Logs:');
        });
        
        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('\\n👋 SIGTERM signal received: closing HTTP server');
            server.close(() => {
                console.log('HTTP server closed');
                process.exit(0);
            });
        });
        
        process.on('SIGINT', () => {
            console.log('\\n👋 SIGINT signal received: closing HTTP server');
            server.close(() => {
                console.log('HTTP server closed');
                process.exit(0);
            });
        });
        
    } catch (error) {
        console.error('❌ Error starting server:', error.message);
        console.log('\\n💡 Suggestions:');
        console.log('   1. Check if another process is using ports 5000-5010');
        console.log('   2. Try running: lsof -i :5000-5010 (on Mac/Linux)');
        console.log('   3. Try running: netstat -ano | findstr :500 (on Windows)');
        process.exit(1);
    }
}

// Start the server
startServer();