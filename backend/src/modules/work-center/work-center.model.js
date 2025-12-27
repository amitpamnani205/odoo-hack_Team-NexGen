import mongoose from 'mongoose';

const workCenterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, default: '', trim: true },
    tag: { type: String, default: '', trim: true },
    alternativeWorkCenters: { type: String, default: '', trim: true },
    costPerHour: { type: Number, default: 0 },
    capacity: { type: Number, default: 0 },
    timeEfficiency: { type: Number, default: 0 },
    oeeTarget: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const WorkCenter = mongoose.model('WorkCenter', workCenterSchema);

