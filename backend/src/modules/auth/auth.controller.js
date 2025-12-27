import { sendResponse } from '../../utils/response.js';
import { signupService, loginService } from './auth.service.js';

export const signup = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if (!name || !email || !password) {
      return sendResponse(res, 400, false, 'Please provide name, email and password');
    }

    const data = await signupService({ name, email, password, role });

    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    };
    res.cookie('token', data.token, cookieOptions);

    return sendResponse(res, 201, true, 'Signup successful', data.user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return sendResponse(res, 400, false, 'Email and password required');
    }

    const data = await loginService(email, password);

    // set cookie
    res.cookie('token', data.token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return sendResponse(res, 200, true, 'Login successful', data.user);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  return sendResponse(res, 200, true, 'Logged out');
};

