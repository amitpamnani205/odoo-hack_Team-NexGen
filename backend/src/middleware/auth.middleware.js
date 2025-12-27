import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../modules/auth/auth.model.js';
import { sendResponse } from '../utils/response.js';

export const authenticate = async (req, res, next) => {
  try {
    // get token from cookie or header
    let token = req.cookies.token;
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) {
      return sendResponse(res, 401, false, 'Not authenticated');
    }

    // verify token
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // get user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return sendResponse(res, 401, false, 'User not found');
    }

    if (!user.isActive) {
      return sendResponse(res, 401, false, 'Account inactive');
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return sendResponse(res, 401, false, 'Invalid token');
    }
    if (err.name === 'TokenExpiredError') {
      return sendResponse(res, 401, false, 'Token expired');
    }
    next(err);
  }
};

// check user role
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendResponse(res, 401, false, 'Not authenticated');
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendResponse(res, 403, false, 'Access denied');
    }

    next();
  };
};

