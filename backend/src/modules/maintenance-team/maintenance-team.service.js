import { MaintenanceTeam } from './maintenance-team.model.js';
import { User } from '../auth/auth.model.js';

// Create a new maintenance team
export const createTeamService = async (teamData) => {
  const { name, description, teamMembers } = teamData;

  // Check if team name already exists
  const existingTeam = await MaintenanceTeam.findOne({ name });
  if (existingTeam) {
    const err = new Error('Team name already exists');
    err.statusCode = 400;
    throw err;
  }

  // Validate team members if provided
  if (teamMembers && teamMembers.length > 0) {
    // Check each member exists and is active
    for (const memberId of teamMembers) {
      const user = await User.findById(memberId);
      if (!user || !user.isActive) {
        const err = new Error('One or more team members are invalid or inactive');
        err.statusCode = 400;
        throw err;
      }
    }
  }

  // Create team
  const newTeam = await MaintenanceTeam.create({
    name,
    description: description || '',
    teamMembers: teamMembers || []
  });

  // Populate team members
  await newTeam.populate({
    path: 'teamMembers',
    select: 'name email role'
  });

  return newTeam;
};

// Get all maintenance teams
export const getAllTeamsService = async (filters = {}) => {
  const { isActive, search } = filters;
  
  const query = {};
  
  if (isActive !== undefined) {
    query.isActive = isActive;
  }
  
  if (search) {
    // Search by team name (case insensitive)
    query.name = { $regex: search, $options: 'i' };
  }

  const teams = await MaintenanceTeam.find(query)
    .populate('teamMembers', 'name email role')
    .sort({ createdAt: -1 });
  return teams;
};

// Get team by ID
export const getTeamByIdService = async (teamId) => {
  const team = await MaintenanceTeam.findById(teamId)
    .populate('teamMembers', 'name email role');
  
  if (!team) {
    const err = new Error('Maintenance team not found');
    err.statusCode = 404;
    throw err;
  }

  return team;
};

// Update team
export const updateTeamService = async (teamId, updateData) => {
  const { name, description, isActive } = updateData;

  const team = await MaintenanceTeam.findById(teamId);
  if (!team) {
    const err = new Error('Maintenance team not found');
    err.statusCode = 404;
    throw err;
  }

  // Check if name is being updated and if it already exists
  if (name && name !== team.name) {
    const existingTeam = await MaintenanceTeam.findOne({ name });
    if (existingTeam) {
      const err = new Error('Team name already exists');
      err.statusCode = 400;
      throw err;
    }
    team.name = name;
  }

  if (description !== undefined) {
    team.description = description;
  }

  if (isActive !== undefined) {
    team.isActive = isActive;
  }

  await team.save();
  
  // Get updated team with populated members
  const updatedTeam = await MaintenanceTeam.findById(teamId)
    .populate('teamMembers', 'name email role');
  return updatedTeam;
};

// Delete team (soft delete by setting isActive to false)
export const deleteTeamService = async (teamId) => {
  const team = await MaintenanceTeam.findById(teamId);
  
  if (!team) {
    const err = new Error('Maintenance team not found');
    err.statusCode = 404;
    throw err;
  }

  // Soft delete
  team.isActive = false;
  await team.save();
  
  // Get updated team with populated members
  const updatedTeam = await MaintenanceTeam.findById(teamId)
    .populate('teamMembers', 'name email role');
  return updatedTeam;
};

// Add team member
export const addTeamMemberService = async (teamId, memberId) => {
  const team = await MaintenanceTeam.findById(teamId);
  if (!team) {
    const err = new Error('Maintenance team not found');
    err.statusCode = 404;
    throw err;
  }

  // Check if user exists and is active
  const user = await User.findById(memberId);
  if (!user || !user.isActive) {
    const err = new Error('User not found or inactive');
    err.statusCode = 400;
    throw err;
  }

  // Check if member already exists in team
  if (team.teamMembers.includes(memberId)) {
    const err = new Error('User is already a member of this team');
    err.statusCode = 400;
    throw err;
  }

  team.teamMembers.push(memberId);
  await team.save();
  
  // Populate team members
  await team.populate({
    path: 'teamMembers',
    select: 'name email role'
  });

  return team;
};

// Remove team member
export const removeTeamMemberService = async (teamId, memberId) => {
  const team = await MaintenanceTeam.findById(teamId);
  if (!team) {
    const err = new Error('Maintenance team not found');
    err.statusCode = 404;
    throw err;
  }

  // Check if member exists in team
  if (!team.teamMembers.includes(memberId)) {
    const err = new Error('User is not a member of this team');
    err.statusCode = 400;
    throw err;
  }

  team.teamMembers = team.teamMembers.filter(
    id => id.toString() !== memberId.toString()
  );
  
  await team.save();
  
  // Populate team members
  await team.populate({
    path: 'teamMembers',
    select: 'name email role'
  });

  return team;
};

// Get teams by member ID (useful for finding which teams a user belongs to)
export const getTeamsByMemberService = async (memberId) => {
  const teams = await MaintenanceTeam.find({
    teamMembers: memberId,
    isActive: true
  })
    .populate('teamMembers', 'name email role')
    .sort({ name: 1 });
  
  return teams;
};

