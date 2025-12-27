import express from "express";
import {
  createEquipment,
  getAllEquipment,
} from "./equipment.controller.js";

const router = express.Router();

router.post("/", createEquipment);
router.get("/", getAllEquipment);

export default router;

