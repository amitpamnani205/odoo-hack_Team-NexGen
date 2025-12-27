import { sendResponse } from "../../utils/response.js";
import {
  createEquipmentCategory,
  getAllEquipmentCategories,
  getEquipmentCategoryById,
} from "./equipmentCategory.service.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name, defaultMaintenanceTeam, isActive } = req.body;

    if (!name || !defaultMaintenanceTeam) {
      return sendResponse(
        res,
        400,
        false,
        "name and defaultMaintenanceTeam are required"
      );
    }

    const category = await createEquipmentCategory({
      name,
      defaultMaintenanceTeam,
      isActive,
    });

    return sendResponse(res, 201, true, "Equipment category created", category);
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllEquipmentCategories();
    return sendResponse(res, 200, true, "Equipment categories fetched", categories);
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await getEquipmentCategoryById(req.params.id);
    return sendResponse(res, 200, true, "Equipment category fetched", category);
  } catch (err) {
    next(err);
  }
};

