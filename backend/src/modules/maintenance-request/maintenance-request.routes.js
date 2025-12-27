import express from 'express';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequest,
  assignTechnician,
  updateStage,
  getRequestsByEquipment,
  getOpenRequestsCount,
  getPreventiveRequestsForCalendar
} from './maintenance-request.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create new request (any authenticated user can create)
router.post('/', createRequest);

// Get all requests
router.get('/', getAllRequests);

// Get preventive requests for calendar view
router.get('/calendar/preventive', getPreventiveRequestsForCalendar);

// Get requests by equipment ID (for smart button)
router.get('/equipment/:equipmentId', getRequestsByEquipment);

// Get count of open requests for equipment (for smart button badge)
router.get('/equipment/:equipmentId/open-count', getOpenRequestsCount);

// Get request by ID
router.get('/:id', getRequestById);

// Update request
router.put('/:id', updateRequest);

// Assign technician to request
router.post('/:id/assign', assignTechnician);

// Update request stage (move through workflow)
router.put('/:id/stage', updateStage);

export default router;

