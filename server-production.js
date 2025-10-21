const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Production CORS settings
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://159.203.136.138',
    'http://159.203.136.138:3000',
    'https://159.203.136.138',
    'https://159.203.136.138:3000'
];

// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.static('.')); // Serve static files from current directory
app.use('/api', require('./app/cater/cater-api'));
app.use('/api', require('./app/jobfit/jobfit-api'));
app.use('/api', require('./app/resume/resume-api'));
// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/app/index/index.html');
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Resume Rewriter Backend is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Add security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per window

const rateLimit = (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;
    
    if (!rateLimitMap.has(clientIP)) {
        rateLimitMap.set(clientIP, []);
    }
    
    const requests = rateLimitMap.get(clientIP);
    const validRequests = requests.filter(time => time > windowStart);
    
    if (validRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
        return res.status(429).json({
            error: 'Too many requests. Please try again later.',
            retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000)
        });
    }
    
    validRequests.push(now);
    rateLimitMap.set(clientIP, validRequests);
    next();
};

// Apply rate limiting to API routes
app.use('/api', rateLimit);




// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Resume Rewriter Backend running on port ${PORT}`);
    console.log(`📝 Health check: http://localhost:${PORT}/health`);
    console.log(`🔗 API Endpoints:`);
    console.log(`   • /api/rewrite-resume - Resume rewriting (resume.js)`);
    console.log(`   • /api/extract-job-description - Job description extraction (cater.js)`);
    console.log(`   • /api/tailor-resume - Resume tailoring (cater.js)`);
    console.log(`   • /api/test-api-key - API key validation (jobfit.js)`);
    console.log(`   • /api/analyze-job-fit - Job fit analysis (jobfit.js)`);
    console.log(`🌐 Serving static files from current directory`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});