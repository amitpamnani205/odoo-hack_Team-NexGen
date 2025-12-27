import EquipmentCategory from "./equipmentCategory.model.js";

export const createEquipmentCategory = async (data) => {
  return EquipmentCategory.create({
    name: data.name,
    defaultMaintenanceTeam: data.defaultMaintenanceTeam,
    isActive: data.isActive ?? true,
  });
};

