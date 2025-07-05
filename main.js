const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const rateLimit = require('express-rate-limit');

require('dotenv').config();
const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const HTTPS_KEY = process.env.HTTPS_KEY || path.join(__dirname, 'selfsigned.key');
const HTTPS_CERT = process.env.HTTPS_CERT || path.join(__dirname, 'selfsigned.cert');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter);
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});
app.use(express.static(path.join(__dirname, 'frontend/out')));

app.get('/shanchi', (req, res) => {
  res.sendFile(path.join(__dirname, 'xqwlight/JavaScript/index.html'));
});

// Serve Xiangqi content
// The Xiangqi content lives under <root>/xqwlight/JavaScript/* directories
app.use(express.static(path.join(__dirname, 'xqwlight/JavaScript')));

// Serve online Xiangqi content
app.get('/xiangqi', (req, res) => {
  res.sendFile(path.join(__dirname, 'Xiangqi/index.html'));
});

// Serve Xiangqi content
// The Xiangqi content lives under <root>/xqwlight/JavaScript/* directories
app.use(express.static(path.join(__dirname, 'Xiangqi')));
app.use('/api/log', (req, res) => {
  const tagMessage = req.body.tag || "unknown";
  const logMessage = req.body.log || "No log message provided";
  const timestamp = new Date().toLocaleString();
  const logLine = `${timestamp} | ${req.ip} | ${tagMessage} | ${logMessage}\n`;

  console.log("[/api/log]: ", logLine);

  fs.appendFile('server.log', logLine, err => {
    if (err) {
      console.error('Error writing to log file:', err);
      return res.sendStatus(500); // Indicate an error
    }
    console.log('Log received and saved:', logLine);
    res.sendStatus(200); // Indicate success
  });
})

app.use('/api/visit-count', (req, res) => {
  const visitCountFile = path.join(__dirname, 'visit_count.txt');

  // Read the current visit count
  fs.readFile(visitCountFile, 'utf8', (err, data) =>
    {
      if (err) {
        console.error('Error reading visit count file:', err);
        return res.status(500).send('Internal Server Error');
      }

      let visitCount = parseInt(data, 10);
      if (isNaN(visitCount)) {
        visitCount = 0; // Initialize to 0 if the file is empty or invalid
      }

      // Increment the visit count
      visitCount += 1;

      // Write the updated count back to the file
      fs.writeFile(visitCountFile, visitCount.toString(), 'utf8', (err) => {
        if (err) {
          console.error('Error writing visit count file:', err);
          return res.status(500).send('Internal Server Error');
        }

        // Send the updated count as a response
        res.json({
          count: visitCount
        });
      });
  }
  );
});

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
