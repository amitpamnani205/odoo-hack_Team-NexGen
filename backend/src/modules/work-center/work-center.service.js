import { WorkCenter } from './work-center.model.js';

export const createWorkCenter = async (data) => {
  const wc = await WorkCenter.create(data);
  return wc;
};

export const getWorkCenters = async () => {
  return WorkCenter.find({ isActive: true }).sort({ createdAt: -1 });
};

export const getWorkCenterById = async (id) => {
  const wc = await WorkCenter.findById(id);
  if (!wc) {
    const err = new Error('Work Center not found');
    err.statusCode = 404;
    throw err;
  }
  return wc;
};

export const updateWorkCenter = async (id, data) => {
  const wc = await WorkCenter.findById(id);
  if (!wc) {
    const err = new Error('Work Center not found');
    err.statusCode = 404;
    throw err;
  }
  Object.assign(wc, data);
  await wc.save();
  return wc;
};

export const deleteWorkCenter = async (id) => {
  const wc = await WorkCenter.findById(id);
  if (!wc) {
    const err = new Error('Work Center not found');
    err.statusCode = 404;
    throw err;
  }
  wc.isActive = false;
  await wc.save();
  return wc;
};

