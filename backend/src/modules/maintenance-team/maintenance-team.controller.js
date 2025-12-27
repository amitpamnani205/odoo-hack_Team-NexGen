import { sendResponse } from '../../utils/response.js';
import {
  createTeamService,
  getAllTeamsService,
  getTeamByIdService,
  updateTeamService,
  deleteTeamService,
  addTeamMemberService,
  removeTeamMemberService,
  getTeamsByMemberService
} from './maintenance-team.service.js';

// Create a new maintenance team
export const createTeam = async (req, res, next) => {
  try {
    const { name, description, teamMembers } = req.body;

    if (!name) {
      return sendResponse(res, 400, false, 'Team name is required');
    }

    const team = await createTeamService({ name, description, teamMembers });
    return sendResponse(res, 201, true, 'Maintenance team created successfully', team);
  } catch (err) {
    next(err);
  }
};

// Get all maintenance teams
export const getAllTeams = async (req, res, next) => {
  try {
    const { isActive, search } = req.query;
    
    const filters = {};
    if (isActive !== undefined) {
      filters.isActive = isActive === 'true';
    }
    if (search) {
      filters.search = search;
    }

    const teams = await getAllTeamsService(filters);
    return sendResponse(res, 200, true, 'Teams retrieved successfully', teams);
  } catch (err) {
    next(err);
  }
};

// Get team by ID
export const getTeamById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await getTeamByIdService(id);
    return sendResponse(res, 200, true, 'Team retrieved successfully', team);
  } catch (err) {
    next(err);
  }
};

// Update team
export const updateTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;

    const team = await updateTeamService(id, updateData);
    return sendResponse(res, 200, true, 'Team updated successfully', team);
  } catch (err) {
    next(err);
  }
};

// Delete team (soft delete)
export const deleteTeam = async (req, res, next) => {
  try {
    const { id } = req.params;
    const team = await deleteTeamService(id);
    return sendResponse(res, 200, true, 'Team deleted successfully', team);
  } catch (err) {
    next(err);
  }
};

// Add team member
export const addTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { memberId } = req.body;

    if (!memberId) {
      return sendResponse(res, 400, false, 'Member ID is required');
    }

    const team = await addTeamMemberService(id, memberId);
    return sendResponse(res, 200, true, 'Team member added successfully', team);
  } catch (err) {
    next(err);
  }
};

// Remove team member
export const removeTeamMember = async (req, res, next) => {
  try {
    const { id, memberId } = req.params;

    const team = await removeTeamMemberService(id, memberId);
    return sendResponse(res, 200, true, 'Team member removed successfully', team);
  } catch (err) {
    next(err);
  }
};

// Get teams by member ID
export const getTeamsByMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const teams = await getTeamsByMemberService(memberId);
    return sendResponse(res, 200, true, 'Teams retrieved successfully', teams);
  } catch (err) {
    next(err);
  }
};

