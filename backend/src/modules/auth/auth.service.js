import jwt from 'jsonwebtoken';
import { config } from '../../config/env.js';
import { User } from './auth.model.js';

// generate jwt token
export const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

export const signupService = async (userData) => {
  const { name, email, password, role } = userData;

  // check if email already exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    const err = new Error('Email already registered');
    err.statusCode = 400;
    throw err;
  }

  // create user
  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
    role: role ? role : 'user'
  });

  // create token
  const token = generateToken(newUser._id);

  return {
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    },
    token: token
  };
};

export const loginService = async (email, password) => {
  // find user
  const user = await User.findOne({ email: email });
  if (!user) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  // check if account is active
  if (user.isActive === false) {
    const err = new Error('Account is deactivated');
    err.statusCode = 401;
    throw err;
  }

  // verify password
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    throw err;
  }

  // create token
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    token: token
  };
};

