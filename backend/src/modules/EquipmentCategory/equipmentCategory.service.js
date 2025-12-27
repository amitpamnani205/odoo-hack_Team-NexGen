import EquipmentCategory from "./equipmentCategory.model.js";

export const createEquipmentCategory = async (data) => {
  return EquipmentCategory.create({
    name: data.name,
    defaultMaintenanceTeam: data.defaultMaintenanceTeam,
    isActive: data.isActive ?? true,
  });
};

export const getAllEquipmentCategories = async () => {
  return EquipmentCategory.find()
    .populate("defaultMaintenanceTeam", "name")
    .sort({ createdAt: -1 });
};

export const getEquipmentCategoryById = async (id) => {
  const category = await EquipmentCategory.findById(id).populate(
    "defaultMaintenanceTeam",
    "name"
  );
  if (!category) {
    const err = new Error("Equipment category not found");
    err.statusCode = 404;
    throw err;
  }
  return category;
};
