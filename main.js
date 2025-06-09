
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

require('dotenv').config();
const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const HTTPS_KEY = process.env.HTTPS_KEY || path.join(__dirname, 'selfsigned.key');
const HTTPS_CERT = process.env.HTTPS_CERT || path.join(__dirname, 'selfsigned.cert');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});
app.use(express.static(path.join(__dirname, 'frontend/out'), {
  index: false,
  extensions: ['html']
}));

app.get('/shanchi', (req, res) => {
  res.sendFile(path.join(__dirname, 'xqwlight/JavaScript/index.html'));
});

// Serve Xiangqi content
// The Xiangqi content lives under <root>/xqwlight/JavaScript/* directories
app.use(express.static(path.join(__dirname, 'xqwlight/JavaScript')));

// Static frontend
app.get('/fluent', (req, res) => {
  res.sendFile(path.join(__dirname, 'fluent.html'));
});

// Catch-all middleware for 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'frontend/out/404.html'));
});

// Create an HTTPS server
const options = {
  key: fs.readFileSync(HTTPS_KEY),
  cert: fs.readFileSync(HTTPS_CERT)
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});

http.createServer((req, res) => {
  // Redirect HTTP requests to HTTPS
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
  console.log(`Redirecting HTTP to HTTPS on port ${HTTPS_PORT}`);
});
