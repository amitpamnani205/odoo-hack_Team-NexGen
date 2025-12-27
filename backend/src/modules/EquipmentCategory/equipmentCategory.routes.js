import express from "express";
import { createCategory } from "./equipmentCategory.controller.js";

const router = express.Router();

router.post("/", createCategory);

export default router;

