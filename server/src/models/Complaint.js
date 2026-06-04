import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    attachmentUrl: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "Other",
    },

    predictedCategory: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Submitted",
        "Response Initiated",
        "Under Work",
        "Resolved",
        "Rejected",
      ],
      default: "Submitted",
    },

    remarks: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Complaint", complaintSchema);
