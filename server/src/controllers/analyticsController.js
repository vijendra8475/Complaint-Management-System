import Complaint from "../models/Complaint.js";

export const getAnalytics = async (req, res) => {
  try {
    // KPI Cards
    const totalComplaints = await Complaint.countDocuments();

    const resolvedComplaints = await Complaint.countDocuments({
      status: "Resolved",
    });

    const rejectedComplaints = await Complaint.countDocuments({
      status: "Rejected",
    });

    const pendingComplaints = await Complaint.countDocuments({
      status: {
        $nin: ["Resolved", "Rejected"],
      },
    });

    // Category Distribution
    const categoryStats = await Complaint.aggregate([
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // Priority Distribution
    const priorityStats = await Complaint.aggregate([
      {
        $group: {
          _id: "$priority",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const monthlyTrends = await Complaint.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,

    //   totalComplaints,
    //   resolvedComplaints,
    //   pendingComplaints,
    //   rejectedComplaints,

    //   categoryStats,
    //   priorityStats,
    monthlyTrends
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
