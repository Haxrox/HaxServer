
const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 4430;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/xiangqi', (req, res) => {
  res.sendFile(path.join(__dirname, 'xqwlight/JavaScript/index.html'));
});

// Serve Xiangqi content
// The Xiangqi content lives under <root>/xqwlight/JavaScript/* directories
app.use(express.static(path.join(__dirname, 'xqwlight/JavaScript')));

// Next.js frontend
app.get('/next', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.use(express.static(path.join(__dirname, 'frontend/out')));

// Static frontend
app.get('/fluent', (req, res) => {
  res.sendFile(path.join(__dirname, 'fluent.html'));
});

// app.use(express.static(path.join(__dirname, 'frontend/out')));

http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
});

// Catch-all middleware for 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'frontend/out/404.html'));
});

// Create an HTTPS server
const options = {
  key: fs.readFileSync(path.join(__dirname, 'selfsigned.key')),
  cert: fs.readFileSync(path.join(__dirname, 'selfsigned.crt'))
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
});

