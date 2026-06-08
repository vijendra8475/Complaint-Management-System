import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

import Complaint from "./models/Complaint.js";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import User from "./models/User.js";

import { predictCategory } from "./ai/categoryPredictor.js";
import { predictPriority } from "./ai/priorityPredictor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let user = "";
let userDetails = {};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(expressLayouts);

app.set("layout", "./layouts/main");

export const setUser = (user) => {
  user = user;
};

export const setUserDetails = (user) => {
  userDetails = user;
};

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/analytics", analyticsRoutes);

app.post("/complaints/new", async (req, res) => {
  console.log(req.body);

  try {
    const { title, description } = req.body;

    // const predictedCategory = await predictCategory(title, description);
    const predictedCategory = "Defined Category";

    // const priority = await predictPriority(title, description);
    const priority = "always low";

    await Complaint.create({
      title,
      description,

      category: predictedCategory,

      predictedCategory,

      priority,

      createdBy: req.user._id,
    });

    res.redirect("/complaints");
  } catch (error) {
    console.error(error);

    res.redirect("/complaints/new");
  }
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/dashboard", (req, res) => {
  res.render("employee/dashboard", {
    title: "Dashboard",
    user: {
      name: "Vijendra",
    },
  });
});


app.get("/complaints", async (req, res) => {
  try {

    const user = await User.findOne({
      email: "vijendra@example.com",
    });

    const complaints =
      await Complaint.find({
        createdBy: user._id,
      });

    res.render(
      "employee/complaint-details.ejs",
      {
        title: "My Complaints",
        complaints,
      }
    );

  } catch (error) {

    console.error(error);

    res.redirect("/dashboard");

  }
});

app.use((req, res, next) => {
  res.locals.user = {
    name: "Vijendra",
  };

  next();
});
app.get("/complaints/new", (req, res) => {
  res.render("employee/create-complaint", {
    title: "Create Complaint",
  });
});


app.get("/complaints/:id", (req, res) => {
  res.render("employee/complaint-details", {
    title: "Complaint Details",

    complaint: {
      title: "Office WiFi Not Working",

      description: "Internet disconnects every few minutes.",

      category: "Network & Internet",

      priority: "High",

      status: "Under Work",

      remarks: "Network team investigating.",

      createdAt: "2026-06-09",
    },
  });
});


app.get("/profile", (req, res) => {
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

app.get("/admin/dashboard", (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard",

    stats: {
      total: 124,
      pending: 43,
      resolved: 72,
      rejected: 9,
    },
  });
});


app.get("/admin/complaints", (req, res) => {
  res.render("admin/complaints", {
    title: "All Complaints",

    complaints: [
      {
        _id: "1",
        employee: "Vijendra Chandra",
        title: "Office WiFi Not Working",
        category: "Network & Internet",
        priority: "High",
        status: "Under Work",
      },
      {
        _id: "2",
        employee: "Rahul Sharma",
        title: "Salary Not Credited",
        category: "Payroll Issue",
        priority: "Critical",
        status: "Submitted",
      },
    ],
  });
});

app.get("/admin/complaints/:id", (req, res) => {
  res.render("admin/complaint-details", {
    title: "Complaint Details",

    complaint: {
      _id: "1",

      title: "Office WiFi Not Working",

      description:
        "Internet disconnects every few minutes and causes productivity issues.",

      category:
        "Network & Internet",

      priority:
        "High",

      status:
        "Under Work",

      remarks:
        "Network team investigating.",

      createdAt:
        "09 Jun 2026",
    },

    employee: {
      employeeId:
        "EMP001",

      name:
        "Vijendra Chandra",

      email:
        "vijendra@example.com",

      department:
        "Engineering",
    },
  });
});

app.get("/admin/analytics", (req, res) => {
  res.render("admin/analytics", {
    title: "Analytics",

    stats: {
      total: 124,
      pending: 43,
      resolved: 72,
      rejected: 9,
    },
  });
});

app.get("/admin/employees", (req, res) => {
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
export default app;
