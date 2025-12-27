import { sendResponse } from '../../utils/response.js';
import {
  createWorkCenter,
  getWorkCenters,
  getWorkCenterById,
  updateWorkCenter,
  deleteWorkCenter,
} from './work-center.service.js';

export const createWorkCenterController = async (req, res, next) => {
  try {
    const wc = await createWorkCenter(req.body);
    return sendResponse(res, 201, true, 'Work center created', wc);
  } catch (err) {
    next(err);
  }
};

export const getWorkCentersController = async (req, res, next) => {
  try {
    const list = await getWorkCenters();
    return sendResponse(res, 200, true, 'Work centers fetched', list);
  } catch (err) {
    next(err);
  }
};

export const getWorkCenterByIdController = async (req, res, next) => {
  try {
    const wc = await getWorkCenterById(req.params.id);
    return sendResponse(res, 200, true, 'Work center fetched', wc);
  } catch (err) {
    next(err);
  }
};

export const updateWorkCenterController = async (req, res, next) => {
  try {
    const wc = await updateWorkCenter(req.params.id, req.body);
    return sendResponse(res, 200, true, 'Work center updated', wc);
  } catch (err) {
    next(err);
  }
};

export const deleteWorkCenterController = async (req, res, next) => {
  try {
    const wc = await deleteWorkCenter(req.params.id);
    return sendResponse(res, 200, true, 'Work center deleted', wc);
  } catch (err) {
    next(err);
  }
};

