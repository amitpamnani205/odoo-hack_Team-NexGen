import express from 'express';
import {
  createWorkCenterController,
  getWorkCentersController,
  getWorkCenterByIdController,
  updateWorkCenterController,
  deleteWorkCenterController,
} from './work-center.controller.js';

const router = express.Router();

router.post('/', createWorkCenterController);
router.get('/', getWorkCentersController);
router.get('/:id', getWorkCenterByIdController);
router.put('/:id', updateWorkCenterController);
router.delete('/:id', deleteWorkCenterController);

export default router;

