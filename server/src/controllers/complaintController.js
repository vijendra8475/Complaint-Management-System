import Complaint from "../models/Complaint.js";

export const createComplaint = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      attachmentUrl,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Title and description are required",
      });
    }

    const complaint =
      await Complaint.create({
        title,
        description,
        attachmentUrl,

        createdBy: req.user._id,
      });

    res.status(201).json({
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


export const getMyComplaints = async (
  req,
  res
) => {
  try {
    const complaints =
      await Complaint.find({
        createdBy: req.user._id,
      })
      .sort({ createdAt: -1 });

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

export const getComplaintById = async (
  req,
  res
) => {
  try {
    const complaint =
      await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (
      complaint.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

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