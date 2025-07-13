
const fs = require('fs');
const path = require('path');

class Logger {
  /**
   * Initializes the Logger with a specified file path.
   * @param {string} filepath - The path to the log file.
   */
  static SERVER_LOGS_PATH = process.env.SERVER_LOGS || path.join(__dirname, 'server.log');

  constructor(filepath) {
    this.logpath = filepath;
    this.logs = [];

    fs.readFile(this.logpath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading log file:', err);
        return res.status(500).send('Internal Server Error');
      }

      this.logs = data.split("\n").filter(line => line.trim() !== "");
    });
  }

  /**
   * Logs a message with a tag and timestamp.
   * @param {string} ip - The IP address of the user (optional).
   * @param {string} tag - The tag for the log entry.
   * @param {string} message - The log message.
   */
  log(ip, tag, message) {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().toLocaleString();
      const logLine = `${timestamp} | ${ip} | ${tag} | ${message}\n`.trim();

      console.log("[Logger]: ", logLine);

      fs.appendFile(this.logpath, logLine, err => {
        if (err) {
          return reject('Error writing to log file:', err);
        }

        this.logs.push(logLine);
      });
      resolve();
    })
  }

  /**   * Retrieves all logs.
   * @returns {Array} - An array of log entries.
   */
  getLogs() {
    return this.logs;
  }
}

module.exports = Logger;
