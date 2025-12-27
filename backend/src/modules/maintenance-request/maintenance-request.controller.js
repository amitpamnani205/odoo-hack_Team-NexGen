import { sendResponse } from '../../utils/response.js';
import {
  createRequestService,
  getAllRequestsService,
  getRequestByIdService,
  updateRequestService,
  assignTechnicianService,
  updateStageService,
  getRequestsByEquipmentService,
  getOpenRequestsCountService,
  getPreventiveRequestsForCalendarService
} from './maintenance-request.service.js';

// Create a new maintenance request
export const createRequest = async (req, res, next) => {
  try {
    const subject = req.body.subject;
    const description = req.body.description;
    const requestType = req.body.requestType;
    const equipmentId = req.body.equipmentId;
    const scheduledDate = req.body.scheduledDate;
    const priority = req.body.priority;
    const createdById = req.user._id;

    if (!subject || !equipmentId) {
      return sendResponse(res, 400, false, 'Subject and Equipment ID are required');
    }

    const requestData = {
      subject: subject,
      description: description,
      requestType: requestType,
      equipmentId: equipmentId,
      scheduledDate: scheduledDate,
      priority: priority
    };

    const request = await createRequestService(requestData, createdById);

    return sendResponse(res, 201, true, 'Maintenance request created successfully', request);
  } catch (err) {
    next(err);
  }
};

// Get all maintenance requests
export const getAllRequests = async (req, res, next) => {
  try {
    const stage = req.query.stage;
    const requestType = req.query.requestType;
    const equipmentId = req.query.equipmentId;
    const maintenanceTeamId = req.query.maintenanceTeamId;
    const assignedTechnicianId = req.query.assignedTechnicianId;
    const isOverdue = req.query.isOverdue;

    const filters = {};
    if (stage) {
      filters.stage = stage;
    }
    if (requestType) {
      filters.requestType = requestType;
    }
    if (equipmentId) {
      filters.equipmentId = equipmentId;
    }
    if (maintenanceTeamId) {
      filters.maintenanceTeamId = maintenanceTeamId;
    }
    if (assignedTechnicianId) {
      filters.assignedTechnicianId = assignedTechnicianId;
    }
    if (isOverdue !== undefined) {
      if (isOverdue === 'true') {
        filters.isOverdue = true;
      } else {
        filters.isOverdue = false;
      }
    }

    const requests = await getAllRequestsService(filters);
    return sendResponse(res, 200, true, 'Requests retrieved successfully', requests);
  } catch (err) {
    next(err);
  }
};

// Get request by ID
export const getRequestById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const request = await getRequestByIdService(id);
    return sendResponse(res, 200, true, 'Request retrieved successfully', request);
  } catch (err) {
    next(err);
  }
};

// Update request
export const updateRequest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const subject = req.body.subject;
    const description = req.body.description;
    const scheduledDate = req.body.scheduledDate;
    const priority = req.body.priority;
    const duration = req.body.duration;

    const updateData = {};
    if (subject !== undefined) {
      updateData.subject = subject;
    }
    if (description !== undefined) {
      updateData.description = description;
    }
    if (scheduledDate !== undefined) {
      updateData.scheduledDate = scheduledDate;
    }
    if (priority !== undefined) {
      updateData.priority = priority;
    }
    if (duration !== undefined) {
      updateData.duration = duration;
    }

    const request = await updateRequestService(id, updateData);
    return sendResponse(res, 200, true, 'Request updated successfully', request);
  } catch (err) {
    next(err);
  }
};

// Assign technician to request
export const assignTechnician = async (req, res, next) => {
  try {
    const id = req.params.id;
    const technicianId = req.body.technicianId;

    if (!technicianId) {
      return sendResponse(res, 400, false, 'Technician ID is required');
    }

    const request = await assignTechnicianService(id, technicianId);
    return sendResponse(res, 200, true, 'Technician assigned successfully', request);
  } catch (err) {
    next(err);
  }
};

// Update request stage
export const updateStage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const stage = req.body.stage;
    const userId = req.user._id;

    if (!stage) {
      return sendResponse(res, 400, false, 'Stage is required');
    }

    const request = await updateStageService(id, stage, userId);
    return sendResponse(res, 200, true, 'Stage updated successfully', request);
  } catch (err) {
    next(err);
  }
};

// Get requests by equipment ID
export const getRequestsByEquipment = async (req, res, next) => {
  try {
    const equipmentId = req.params.equipmentId;
    const requests = await getRequestsByEquipmentService(equipmentId);
    return sendResponse(res, 200, true, 'Requests retrieved successfully', requests);
  } catch (err) {
    next(err);
  }
};

// Get count of open requests for equipment
export const getOpenRequestsCount = async (req, res, next) => {
  try {
    const equipmentId = req.params.equipmentId;
    const count = await getOpenRequestsCountService(equipmentId);
    return sendResponse(res, 200, true, 'Open requests count retrieved successfully', { count: count });
  } catch (err) {
    next(err);
  }
};

// Get preventive requests for calendar
export const getPreventiveRequestsForCalendar = async (req, res, next) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const requests = await getPreventiveRequestsForCalendarService(startDate, endDate);
    return sendResponse(res, 200, true, 'Preventive requests retrieved successfully', requests);
  } catch (err) {
    next(err);
  }
};
