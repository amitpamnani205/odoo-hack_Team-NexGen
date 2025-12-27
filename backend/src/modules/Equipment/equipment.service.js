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
    .populate({
      path: "categoryId",
      populate: { path: "defaultMaintenanceTeam", select: "name" },
    })
    .populate("maintenanceTeamId");
};

export const getEquipmentById = async (id) => {
  const equipment = await Equipment.findById(id)
    .populate({
      path: "categoryId",
      populate: { path: "defaultMaintenanceTeam", select: "name" },
    })
    .populate("maintenanceTeamId");

  if (!equipment) {
    const err = new Error("Equipment not found");
    err.statusCode = 404;
    throw err;
  }

  return equipment;
};

export const updateEquipment = async (id, data) => {
  const equipment = await Equipment.findById(id);
  if (!equipment) {
    const err = new Error("Equipment not found");
    err.statusCode = 404;
    throw err;
  }

  let maintenanceTeamId = equipment.maintenanceTeamId;
  if (data.categoryId && data.categoryId.toString() !== equipment.categoryId.toString()) {
    const category = await EquipmentCategory.findById(data.categoryId);
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      throw err;
    }
    maintenanceTeamId = category.defaultMaintenanceTeam;
  }

  const updateData = { ...data };
  if (maintenanceTeamId) {
    updateData.maintenanceTeamId = maintenanceTeamId;
  }

  const updated = await Equipment.findByIdAndUpdate(id, updateData, { new: true })
    .populate({
      path: "categoryId",
      populate: { path: "defaultMaintenanceTeam", select: "name" },
    })
    .populate("maintenanceTeamId");
  return updated;
};

export const deleteEquipment = async (id) => {
  const equipment = await Equipment.findById(id);
  if (!equipment) {
    const err = new Error("Equipment not found");
    err.statusCode = 404;
    throw err;
  }

  await equipment.deleteOne();
  return equipment;
};
