import express from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
} from "./equipmentCategory.controller.js";

const router = express.Router();

router.use(authenticate);

router.post("/", authorize("admin", "manager"), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);

export default router;
