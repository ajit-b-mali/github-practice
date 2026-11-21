const http = require('http');
const healthV1 = require('./v1/routes/health');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            name: 'GitHub Practice API',
            version: '1.0.0',
            message: 'Welcome!',
            endpoints: [
                {
                    method: 'GET',
                    path: '/',
                    description: 'API information and available endpoints'
                },
                {
                    method: 'GET',
                    path: '/health',
                    description: 'Health check'
                }
            ]
        }));
        return;
    }

    if (req.url === '/api/v1/health' && req.method === 'GET') {
        healthV1(req, res);
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
