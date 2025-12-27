import { sendResponse } from "../../utils/response.js";
import {
  createEquipment as createEquipmentService,
  getAllEquipment as getAllEquipmentService,
  getEquipmentById as getEquipmentByIdService,
  updateEquipment as updateEquipmentService,
  deleteEquipment as deleteEquipmentService,
} from "./equipment.service.js";

export const createEquipment = async (req, res, next) => {
  try {
    const equipment = await createEquipmentService(req.body);
    return sendResponse(res, 201, true, "Equipment created", equipment);
  } catch (err) {
    next(err);
  }
};

export const getAllEquipment = async (req, res, next) => {
  try {
    const equipmentList = await getAllEquipmentService();
    return sendResponse(res, 200, true, "Equipment fetched", equipmentList);
  } catch (err) {
    next(err);
  }
};

export const getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await getEquipmentByIdService(req.params.id);
    return sendResponse(res, 200, true, "Equipment fetched", equipment);
  } catch (err) {
    next(err);
  }
};

export const updateEquipment = async (req, res, next) => {
  try {
    const equipment = await updateEquipmentService(req.params.id, req.body);
    return sendResponse(res, 200, true, "Equipment updated", equipment);
  } catch (err) {
    next(err);
  }
};

export const deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await deleteEquipmentService(req.params.id);
    return sendResponse(res, 200, true, "Equipment deleted", equipment);
  } catch (err) {
    next(err);
  }
};
