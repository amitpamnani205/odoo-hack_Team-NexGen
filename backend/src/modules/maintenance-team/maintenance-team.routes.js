import express from 'express';
import { authenticate, authorize } from '../../middleware/auth.middleware.js';
import {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addTeamMember,
  removeTeamMember,
  getTeamsByMember
} from './maintenance-team.controller.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Create team (admin or manager only)
router.post('/', authorize('admin', 'manager'), createTeam);

// Get all teams
router.get('/', getAllTeams);

// Get team by ID
router.get('/:id', getTeamById);

// Update team (admin or manager only)
router.put('/:id', authorize('admin', 'manager'), updateTeam);

// Delete team (admin or manager only)
router.delete('/:id', authorize('admin', 'manager'), deleteTeam);

// Add team member (admin or manager only)
router.post('/:id/members', authorize('admin', 'manager'), addTeamMember);

// Remove team member (admin or manager only)
router.delete('/:id/members/:memberId', authorize('admin', 'manager'), removeTeamMember);

// Get teams by member ID
router.get('/member/:memberId', getTeamsByMember);

export default router;

