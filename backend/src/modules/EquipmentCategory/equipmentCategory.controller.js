import { sendResponse } from "../../utils/response.js";
import { createEquipmentCategory } from "./equipmentCategory.service.js";

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

