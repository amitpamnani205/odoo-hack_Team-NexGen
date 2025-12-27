import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    // ===== BASIC INFO =====
    name: {
      type: String,
      required: true,
      trim: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    // ===== CATEGORY & RESPONSIBILITY =====
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EquipmentCategory",
      required: true,
    },

    maintenanceTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MaintenanceTeam",
      required: true,
    },

    defaultTechnicianId: {
      type: String,
      default: "",
    },

    // ===== OWNERSHIP =====
    assignedToType: {
      type: String,
      enum: ["employee", "department"],
      required: true,
    },

    assignedToId: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      default: "",
    },

    // ===== LOCATION =====
    location: {
      type: String,
      required: true,
    },

    workCenter: {
      type: String,
      default: "",
    },

    // ===== DATES =====
    assignedDate: {
      type: Date,
      default: Date.now,
    },

    scrapDate: {
      type: Date,
      default: null,
    },

    // ===== STATUS =====
    isScrapped: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
