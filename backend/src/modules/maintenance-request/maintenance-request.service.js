import { MaintenanceRequest } from './maintenance-request.model.js';
import Equipment from '../Equipment/equipment.model.js';
import { User } from '../auth/auth.model.js';
import { MaintenanceTeam } from '../maintenance-team/maintenance-team.model.js';

// Create a new maintenance request with auto-fill logic
export const createRequestService = async (requestData, createdById) => {
  const subject = requestData.subject;
  const description = requestData.description;
  const requestType = requestData.requestType;
  const equipmentId = requestData.equipmentId;
  const scheduledDate = requestData.scheduledDate;
  const priority = requestData.priority;

  // Validate equipment exists
  const equipment = await Equipment.findById(equipmentId);
  if (!equipment) {
    const err = new Error('Equipment not found');
    err.statusCode = 404;
    throw err;
  }

  // Check if equipment is scrapped
  if (equipment.isScrapped === true) {
    const err = new Error('Cannot create request for scrapped equipment');
    err.statusCode = 400;
    throw err;
  }

  // Auto-fill: Get maintenance team and category from equipment
  const maintenanceTeamId = equipment.maintenanceTeamId;
  const categoryId = equipment.categoryId;

  // Set defaults if not provided
  let finalDescription = '';
  if (description) {
    finalDescription = description;
  }

  let finalRequestType = 'corrective';
  if (requestType) {
    finalRequestType = requestType;
  }

  let finalPriority = 'medium';
  if (priority) {
    finalPriority = priority;
  }

  // Create request - starts in 'new' stage
  const newRequest = await MaintenanceRequest.create({
    subject: subject,
    description: finalDescription,
    requestType: finalRequestType,
    equipmentId: equipmentId,
    categoryId: categoryId,
    maintenanceTeamId: maintenanceTeamId,
    scheduledDate: scheduledDate,
    priority: finalPriority,
    createdById: createdById,
    stage: 'new'
  });

  // Get the created request with populated fields
  const populatedRequest = await MaintenanceRequest.findById(newRequest._id)
    .populate('equipmentId', 'name serialNumber location')
    .populate('maintenanceTeamId', 'name')
    .populate('categoryId', 'name')
    .populate('assignedTechnicianId', 'name email')
    .populate('createdById', 'name email');

  return populatedRequest;
};

// Get all maintenance requests with filters
export const getAllRequestsService = async (filters) => {
  const stage = filters.stage;
  const requestType = filters.requestType;
  const equipmentId = filters.equipmentId;
  const maintenanceTeamId = filters.maintenanceTeamId;
  const assignedTechnicianId = filters.assignedTechnicianId;
  const isOverdue = filters.isOverdue;

  // Build query step by step
  const query = {};

  if (stage) {
    query.stage = stage;
  }

  if (requestType) {
    query.requestType = requestType;
  }

  if (equipmentId) {
    query.equipmentId = equipmentId;
  }

  if (maintenanceTeamId) {
    query.maintenanceTeamId = maintenanceTeamId;
  }

  if (assignedTechnicianId) {
    query.assignedTechnicianId = assignedTechnicianId;
  }

  if (isOverdue === true) {
    query.isOverdue = true;
  } else if (isOverdue === false) {
    query.isOverdue = false;
  }

  // Find requests
  const requests = await MaintenanceRequest.find(query)
    .populate('equipmentId', 'name serialNumber location')
    .populate('maintenanceTeamId', 'name')
    .populate('categoryId', 'name')
    .populate('assignedTechnicianId', 'name email')
    .populate('createdById', 'name email')
    .sort({ createdAt: -1 });

  return requests;
};

// Get request by ID
export const getRequestByIdService = async (requestId) => {
  const request = await MaintenanceRequest.findById(requestId)
    .populate('equipmentId', 'name serialNumber location')
    .populate('maintenanceTeamId', 'name')
    .populate('categoryId', 'name')
    .populate('assignedTechnicianId', 'name email')
    .populate('createdById', 'name email');

  if (!request) {
    const err = new Error('Maintenance request not found');
    err.statusCode = 404;
    throw err;
  }

  return request;
};

// Update request
export const updateRequestService = async (requestId, updateData) => {
  const request = await MaintenanceRequest.findById(requestId);
  if (!request) {
    const err = new Error('Maintenance request not found');
    err.statusCode = 404;
    throw err;
  }

  const subject = updateData.subject;
  const description = updateData.description;
  const scheduledDate = updateData.scheduledDate;
  const priority = updateData.priority;
  const duration = updateData.duration;

  if (subject !== undefined) {
    request.subject = subject;
  }

  if (description !== undefined) {
    request.description = description;
  }

  if (scheduledDate !== undefined) {
    request.scheduledDate = scheduledDate;
  }

  if (priority !== undefined) {
    request.priority = priority;
  }

  if (duration !== undefined) {
    request.duration = duration;
  }

  await request.save();

  // Get updated request with populated fields
  const updatedRequest = await MaintenanceRequest.findById(requestId)
    .populate('equipmentId', 'name serialNumber location')
    .populate('maintenanceTeamId', 'name')
    .populate('categoryId', 'name')
    .populate('assignedTechnicianId', 'name email')
    .populate('createdById', 'name email');

  return updatedRequest;
};

// Assign technician to request
export const assignTechnicianService = async (requestId, technicianId) => {
  const request = await MaintenanceRequest.findById(requestId);
  if (!request) {
    const err = new Error('Maintenance request not found');
    err.statusCode = 404;
    throw err;
  }

  // Check if technician exists and is active
  const technician = await User.findById(technicianId);
  if (!technician) {
    const err = new Error('Technician not found');
    err.statusCode = 400;
    throw err;
  }

  if (technician.isActive === false) {
    const err = new Error('Technician is inactive');
    err.statusCode = 400;
    throw err;
  }

  // Assign technician
  request.assignedTechnicianId = technicianId;
  await request.save();

  // Get updated request with populated fields
  const updatedRequest = await MaintenanceRequest.findById(requestId)
    .populate('equipmentId', 'name serialNumber location')
    .populate('maintenanceTeamId', 'name')
    .populate('categoryId', 'name')
    .populate('assignedTechnicianId', 'name email')
    .populate('createdById', 'name email');

  return updatedRequest;
};

// Update request stage
export const updateStageService = async (requestId, newStage, userId) => {
  const request = await MaintenanceRequest.findById(requestId);
  if (!request) {
    const err = new Error('Maintenance request not found');
    err.statusCode = 404;
    throw err;
  }

  // Check if stage is valid
  if (newStage !== 'new' && newStage !== 'in_progress' && newStage !== 'repaired' && newStage !== 'scrap') {
    const err = new Error('Invalid stage');
    err.statusCode = 400;
    throw err;
  }

  // Handle stage transitions
  if (newStage === 'in_progress' && request.stage === 'new') {
    request.stage = 'in_progress';
    request.startDate = new Date();
    // Auto-assign if not already assigned
    if (!request.assignedTechnicianId) {
      request.assignedTechnicianId = userId;
    }
  } else if (newStage === 'repaired' && request.stage === 'in_progress') {
    request.stage = 'repaired';
    request.endDate = new Date();
  } else if (newStage === 'scrap') {
    request.stage = 'scrap';
    request.endDate = new Date();
    
    // Scrap Logic: Mark equipment as scrapped
    const equipment = await Equipment.findById(request.equipmentId);
    if (equipment) {
      equipment.isScrapped = true;
      equipment.scrapDate = new Date();
      await equipment.save();
    }
  } else {
    // Allow direct stage updates
    request.stage = newStage;
  }

  await request.save();

  // Get updated request with populated fields
  const updatedRequest = await MaintenanceRequest.findById(requestId)
    .populate('equipmentId', 'name serialNumber location')
    .populate('maintenanceTeamId', 'name')
    .populate('categoryId', 'name')
    .populate('assignedTechnicianId', 'name email')
    .populate('createdById', 'name email');

  return updatedRequest;
};

// Get requests by equipment ID (for smart button)
export const getRequestsByEquipmentService = async (equipmentId) => {
  // Find requests that are new or in progress
  const allRequests = await MaintenanceRequest.find({ equipmentId: equipmentId })
    .populate('equipmentId', 'name serialNumber location')
    .populate('maintenanceTeamId', 'name')
    .populate('categoryId', 'name')
    .populate('assignedTechnicianId', 'name email')
    .populate('createdById', 'name email')
    .sort({ createdAt: -1 });

  // Filter to only open requests (new or in_progress)
  const openRequests = [];
  for (let i = 0; i < allRequests.length; i++) {
    const req = allRequests[i];
    if (req.stage === 'new' || req.stage === 'in_progress') {
      openRequests.push(req);
    }
  }

  return openRequests;
};

// Get count of open requests for equipment (for smart button badge)
export const getOpenRequestsCountService = async (equipmentId) => {
  // Get all requests for this equipment
  const allRequests = await MaintenanceRequest.find({ equipmentId: equipmentId });

  // Count open requests
  let count = 0;
  for (let i = 0; i < allRequests.length; i++) {
    const req = allRequests[i];
    if (req.stage === 'new' || req.stage === 'in_progress') {
      count = count + 1;
    }
  }

  return count;
};

// Get preventive requests for calendar view
export const getPreventiveRequestsForCalendarService = async (startDate, endDate) => {
  // Get all preventive requests
  const allRequests = await MaintenanceRequest.find({ requestType: 'preventive' })
    .populate('equipmentId', 'name serialNumber location')
    .populate('maintenanceTeamId', 'name')
    .populate('categoryId', 'name')
    .populate('assignedTechnicianId', 'name email')
    .populate('createdById', 'name email')
    .sort({ scheduledDate: 1 });

  // Filter out scrapped requests
  const filteredRequests = [];
  for (let i = 0; i < allRequests.length; i++) {
    const req = allRequests[i];
    if (req.stage !== 'scrap') {
      // If date range provided, check if scheduled date is in range
      if (startDate && endDate) {
        const scheduledDate = new Date(req.scheduledDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (scheduledDate >= start && scheduledDate <= end) {
          filteredRequests.push(req);
        }
      } else {
        filteredRequests.push(req);
      }
    }
  }

  return filteredRequests;
};
