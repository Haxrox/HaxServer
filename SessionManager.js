
const crypto = require('crypto');

class SessionError extends Error {
  constructor(message) {
    super(message);
    this.name = "SessionError";
  }
}

class SessionManager {
  constructor() {
    this.sessions = {};
  }

  createSession(userId) {
    const sessionId = this.generateSessionId();
    this.sessions[sessionId] = { userId, createdAt: new Date() };
    return sessionId;
  }

  getSession(sessionId) {
    return this.sessions[sessionId];
  }

  deleteSession(sessionId) {
    delete this.sessions[sessionId];
  }

  generateSessionId() {
    return crypto.randomUUID();
  }

  middleware(req, res, next) {
    const cookie = req.cookies;
    if (!cookie || !cookie.sessionId) {
      res.status(401).redirect("/login");
      return next(new SessionError("Session ID not found in cookies"));
    }

    const sessionId = cookie.sessionId;

    if (sessionId && this.getSession(sessionId)) {
      // req.session = this.sessions[sessionId];
      next();
    } else {
      res.status(401).redirect("/login");
      return next(new SessionError("Unauthorized"));
    }
  }
}

SessionManager.Error = SessionError;

module.exports = SessionManager;
