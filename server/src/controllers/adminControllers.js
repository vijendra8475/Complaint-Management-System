import Complaint from "../models/Complaint.js";
import StatusLog from "../models/StatusLog.js";

const VALID_STATUSES = [
  "Submitted",
  "Response Initiated",
  "Under Work",
  "Resolved",
  "Rejected",
];

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "name email employeeId")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    const previousStatus = complaint.status;

    complaint.status = status;

    await complaint.save();

    await StatusLog.create({
      complaintId: complaint._id,

      previousStatus,

      newStatus: status,

      changedBy: req.user._id,
    });

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateComplaintRemarks = async (req, res) => {
  try {
    const { remarks } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.remarks = remarks;

    await complaint.save();

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
