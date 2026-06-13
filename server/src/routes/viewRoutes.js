import express from "express";

import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

import { predictCategory } from "../ai/categoryPredictor.js";

import { predictPriority } from "../ai/priorityPredictor.js";

const router = express.Router();

/* =========================================
   HOME
========================================= */

router.get("/", (req, res) => {
  res.render("index", {
    title: "WITS",
  });
});

/* =========================================
   EMPLOYEE DASHBOARD
========================================= */

router.get("/dashboard", viewAuth, (req, res) => {
  res.render("employee/dashboard", {
    title: "Dashboard",
  });
});

/* =========================================
   MY COMPLAINTS
========================================= */

router.get("/complaints", viewAuth, async (req, res) => {
  try {
    const complaints = await Complaint.find({
      createdBy: req.session.user._id,
    }).sort({
      createdAt: -1,
    });

    res.render("employee/complaints", {
      title: "My Complaints",

      complaints,
    });
  } catch (error) {
    console.error(error);

    res.redirect("/dashboard");
  }
});

/* =========================================
   CREATE COMPLAINT
========================================= */

router.get("/complaints/new", viewAuth, (req, res) => {
  res.render("employee/create-complaint", {
    title: "Create Complaint",
  });
});

router.post("/complaints/new", viewAuth, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Uncomment later

    const predictedCategory = await predictCategory(title, description);

    const priority = await predictPriority(title, description);

    await Complaint.create({
      title,
      description,

      category: predictedCategory,

      predictedCategory,

      priority,

      createdBy: req.session.user._id,
    });

    res.redirect("/complaints");
  } catch (error) {
    console.error(error);

    res.redirect("/complaints/new");
  }
});

/* =========================================
   COMPLAINT DETAILS
========================================= */

router.get("/complaints/:id", viewAuth, async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,

      createdBy: req.session.user._id,
    });

    if (!complaint) {
      return res.redirect("/complaints");
    }

    res.render("employee/complaint-details", {
      title: "Complaint Details",

      complaint,
    });
  } catch (error) {
    console.error(error);

    res.redirect("/complaints");
  }
});

/* =========================================
   PROFILE
========================================= */

router.get("/profile", viewAuth, (req, res) => {
  res.render("employee/profile", {
    title: "Profile",

    employee: {
      employeeId: "EMP001",

      name: "Vijendra Chandra",

      email: "vijendra@example.com",

      department: "Engineering",

      designation: "Software Developer",

      role: "Employee",
    },
  });
});

/* =========================================
   ADMIN DASHBOARD
========================================= */

router.get("/admin/dashboard", adminViewAuth, async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    const rejected = await Complaint.countDocuments({
      status: "Rejected",
    });

    const pending = await Complaint.countDocuments({
      status: {
        $nin: ["Resolved", "Rejected"],
      },
    });

    res.render("admin/dashboard", {
      title: "Admin Dashboard",

      stats: {
        total,
        pending,
        resolved,
        rejected,
      },
    });
  } catch (error) {
    console.error(error);

    res.redirect("/admin/complaints");
  }
});

/* =========================================
   ADMIN COMPLAINTS
========================================= */

router.get("/admin/complaints", adminViewAuth, async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("createdBy", "name email")
      .sort({
        createdAt: -1,
      });

    res.render("admin/complaints", {
      title: "All Complaints",

      complaints,
    });
  } catch (error) {
    console.error(error);

    res.redirect("/admin/dashboard");
  }
});

/* =========================================
   ADMIN COMPLAINT DETAILS
========================================= */

router.get("/admin/complaints/:id", adminViewAuth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "createdBy",
      "employeeId name email department",
    );

    if (!complaint) {
      return res.redirect("/admin/complaints");
    }

    res.render("admin/complaint-details", {
      title: "Complaint Details",

      complaint,

      employee: complaint.createdBy,
    });
  } catch (error) {
    console.error(error);

    res.redirect("/admin/complaints");
  }
});

router.post("/admin/complaints/:id/update", adminViewAuth, async (req, res) => {
  try {
    const { status, remarks } = req.body;

    await Complaint.findByIdAndUpdate(req.params.id, {
      status,
      remarks,
    });

    res.redirect(`/admin/complaints/${req.params.id}`);
  } catch (error) {
    console.error(error);

    res.redirect("/admin/complaints");
  }
});

/* =========================================
   ANALYTICS
========================================= */

router.get("/admin/analytics", adminViewAuth, async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const resolved = await Complaint.countDocuments({
      status: "Resolved",
    });

    const rejected = await Complaint.countDocuments({
      status: "Rejected",
    });

    const pending = await Complaint.countDocuments({
      status: {
        $nin: ["Resolved", "Rejected"],
      },
    });

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

    res.render("admin/analytics", {
      title: "Analytics",

      stats: {
        total,
        pending,
        resolved,
        rejected,
      },

      categoryStats,
      priorityStats,
    });
  } catch (error) {
    console.error(error);

    res.redirect("/admin/dashboard");
  }
});

/* =========================================
   EMPLOYEES
========================================= */

router.get("/admin/employees", adminViewAuth, (req, res) => {
  res.render("admin/employees", {
    title: "Employees",

    employees: [
      {
        employeeId: "EMP001",

        name: "Vijendra Chandra",

        email: "vijendra@example.com",

        department: "Engineering",

        role: "Employee",
      },

      {
        employeeId: "EMP002",

        name: "Rahul Sharma",

        email: "rahul@example.com",

        department: "HR",

        role: "Employee",
      },
    ],
  });
});

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    hideLayout: true,
  });
});

import bcrypt from "bcryptjs";
import viewAuth from "../middlewares/viewAuth.js";
import adminViewAuth from "../middlewares/adminViewAuth.js";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("auth/login", {
        title: "Login",
        hideLayout: true,
        error: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("auth/login", {
        title: "Login",
        hideLayout: true,
        error: "Invalid email or password",
      });
    }

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log(req.session.user);

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);

    res.render("auth/login", {
      title: "Login",
      hideLayout: true,
      error: "Something went wrong",
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

export default router;
