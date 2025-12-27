import Equipment from "../Equipment/equipment.model.js";
import EquipmentCategory from "../EquipmentCategory/equipmentCategory.model.js";

export const createEquipment = async (data) => {
  // ensure category exists before creating equipment
  const category = await EquipmentCategory.findById(data.categoryId);
  if (!category) {
    const err = new Error("Category not found");
    err.statusCode = 404;
    throw err;
  }

  const equipment = await Equipment.create({
    ...data,
    maintenanceTeamId: category.defaultMaintenanceTeam,
  });

  return equipment;
};

export const getAllEquipment = async () => {
  return Equipment.find({ isScrapped: false })
    .populate("categoryId")
    .populate("maintenanceTeamId");
};

