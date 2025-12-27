import { sendResponse } from "../../utils/response.js";
import {
  createEquipment as createEquipmentService,
  getAllEquipment as getAllEquipmentService,
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

