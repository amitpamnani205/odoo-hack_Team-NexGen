import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.js';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

// cors setup
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// routes
app.use('/api/auth', authRoutes);

// error handler
app.use(errorHandler);

export default app;

