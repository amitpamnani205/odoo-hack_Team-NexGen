import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema(
  {
    // ===== BASIC INFO =====
    subject: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ''
    },

    // ===== REQUEST TYPE =====
    requestType: {
      type: String,
      enum: ['corrective', 'preventive'],
      required: true
    },

    // ===== EQUIPMENT =====
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
      required: true
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EquipmentCategory'
    },
    maintenanceTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MaintenanceTeam',
      required: true
    },

    // ===== ASSIGNMENT =====
    assignedTechnicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // ===== DATES =====
    scheduledDate: {
      type: Date,
      default: null
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    duration: {
      type: Number, // Duration in hours
      default: 0
    },

    // ===== STAGE/WORKFLOW =====
    stage: {
      type: String,
      enum: ['new', 'in_progress', 'repaired', 'scrap'],
      default: 'new'
    },

    // ===== STATUS =====
    isOverdue: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    }
  },
  {
    timestamps: true
  }
);

export const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

