import mongoose from "mongoose";

const statusLogSchema =
  new mongoose.Schema(
    {
      complaintId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
        required: true,
      },

      previousStatus: {
        type: String,
      },

      newStatus: {
        type: String,
        required: true,
      },

      changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      changedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "StatusLog",
  statusLogSchema
);