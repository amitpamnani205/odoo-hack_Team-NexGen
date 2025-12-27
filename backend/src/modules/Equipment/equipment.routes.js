import express from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} from "./equipment.controller.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize("admin", "manager"), createEquipment);
router.get("/", getAllEquipment);
router.get("/:id", getEquipmentById);
router.put("/:id", authorize("admin", "manager"), updateEquipment);
router.delete("/:id", authorize("admin", "manager"), deleteEquipment);

export default router;
