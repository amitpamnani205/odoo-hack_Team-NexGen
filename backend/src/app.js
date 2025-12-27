import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.js';
import { config } from './config/env.js';
import authRoutes from './modules/auth/auth.routes.js';
import equipmentRoutes from './modules/Equipment/equipment.routes.js';
import equipmentCategoryRoutes from './modules/EquipmentCategory/equipmentCategory.routes.js';

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
const apiPrefix = config.apiPrefix || '/api/v1';
app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/equipment`, equipmentRoutes);
app.use(`${apiPrefix}/equipment-categories`, equipmentCategoryRoutes);

// error handler
app.use(errorHandler);

export default app;

