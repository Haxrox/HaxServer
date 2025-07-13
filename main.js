const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');

const Logger = require('./logger');
const SessionManager = require('./SessionManager');
const app = express();

require('dotenv').config();
const HTTP_PORT = process.env.HTTP_PORT || 80;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const HTTPS_KEY = process.env.HTTPS_KEY || path.join(__dirname, 'selfsigned.key');
const HTTPS_CERT = process.env.HTTPS_CERT || path.join(__dirname, 'selfsigned.cert');
const logger = new Logger(Logger.SERVER_LOGS_PATH);
const sessionManager = new SessionManager();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// Global middleware
app.use(limiter);
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for simplicity, adjust as needed
})); // Security headers
app.use(express.json());
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })) // to parse application/x-www-form-urlencoded
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

// Static files
app.use(express.static(path.join(__dirname, 'frontend/out')));
app.use(express.static(path.join(__dirname, 'xqwlight/JavaScript')));
app.use(express.static(path.join(__dirname, 'Xiangqi')));

// API endpoints
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: "g_csrf_token=" + token,
    audience: "314991611736-ou6racd7m30ua6k9h8vs355850f3ppur.apps.googleusercontent.com",  // Specify the WEB_CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If the request specified a Google Workspace domain:
  // const domain = payload['hd'];
  console.log('User ID:', userid);
  console.log('Payload:', payload);
  return payload; // Return the payload for further processing if needed
}

app.post('/api/login', (req, res) => {
  console.log("Cookie: ", req.cookies);
  console.log("Body: ", req.body);

  const username = req.body.username;
  const password = req.body.password;

  if (username !== process.env.USERNAME || password !== process.env.PASSWORD) {
    logger.log(req.ip, 'Login', `User ${username} attempted to log in.`).catch(console.error);
    return res.status(401).redirect('/login');
  }

  // Log the request details
  const token = sessionManager.createSession(username);
  logger.log(req.ip, 'Login', `User ${username} logged in. Token: ${token}`).catch(console.error);

  // Set the session ID in a cookie
  res.cookie('sessionId', token, {
    httpOnly: true, // Prevent client-side access to the cookie
    secure: true, // Use secure cookies in production (HTTPS)
    sameSite: 'Strict', // Prevent CSRF attacks
  });

  res.status(200).redirect('/dashboard');
  // const csrf_token = req.cookies['g_csrf_token'];
  // if (!csrf_token) {
  //   return res.status(400).json({ error: 'CSRF token is required' });
  // }

  // // Verify the token
  // const token = req?.body.token;
  // if (!token) {
  //   return res.status(400).json({ error: 'Token is required' });
  // }

  // verify(token).then(payload => {
  //   console.log('Token verified successfully:', payload);
  // }).catch(console.error);

  // // Here you would typically verify the token with Google
  // // For simplicity, we'll just log it and return a success response
  // console.log('Login token received:', token);
  // res.status(200).json({ message: 'Login successful' });
});

app.get('/api/log', sessionManager.middleware.bind(sessionManager), (req, res) => {
  const logs = logger.getLogs();
  res.type('application/json').send({
    logs: logs
  });
});

app.post('/api/log', (req, res) => {
  const tagMessage = req?.body.tag || "unknown";
  const logMessage = req?.body.log || "No log message provided";

  logger.log(req.ip, tagMessage, logMessage).then(() => {
    res.sendStatus(200); // Indicate success
  }).catch(err => {
    res.status(500).send('Error writing to log file: ' + err.message);
  });
})

app.get('/api/visit-count', (req, res) => {
  const visitCountFile = path.join(__dirname, 'visit_count.txt');

  // Read the current visit count
  fs.readFile(visitCountFile, 'utf8', (err, data) =>{
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
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/index.html'));
});

app.get('/dashboard', sessionManager.middleware.bind(sessionManager), (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/dashboard.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/out/login.html'));
});

app.get('/shanchi', (req, res) => {
  res.sendFile(path.join(__dirname, 'xqwlight/JavaScript/index.html'));
});

// Serve online Xiangqi content
app.get('/xiangqi', (req, res) => {
  res.sendFile(path.join(__dirname, 'Xiangqi/index.html'));
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

// const httpServer = http.createServer(options, app)
// httpServer.listen(HTTP_PORT, () => {
//   console.log(`HTTP Server is running on port ${HTTP_PORT}`);
//   console.log(`Redirecting HTTP to HTTPS on port ${HTTPS_PORT}`);
// });
http.createServer((req, res) => {
  // Redirect HTTP requests to HTTPS
  res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
  res.end();
}).listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on port ${HTTP_PORT}`);
  console.log(`Redirecting HTTP to HTTPS on port ${HTTPS_PORT}`);
});
