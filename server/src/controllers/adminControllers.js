import Complaint from "../models/Complaint.js";

export const getAllComplaints =
  async (req, res) => {
    try {
      const complaints =
        await Complaint.find()
          .populate(
            "createdBy",
            "name email employeeId"
          )
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

export const updateComplaintStatus =
  async (req, res) => {
    res.json({
      message: "Status Updated",
    });
  };