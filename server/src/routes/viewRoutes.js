import express from "express";

import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

import {
  predictCategory,
} from "../ai/categoryPredictor.js";

import {
  predictPriority,
} from "../ai/priorityPredictor.js";

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

router.get("/dashboard", (req, res) => {
  res.render("employee/dashboard", {
    title: "Dashboard",
  });
});

/* =========================================
   MY COMPLAINTS
========================================= */

router.get("/complaints", async (req, res) => {
  try {
    const user = await User.findOne({
      email: "vijendra@example.com",
    });

    const complaints =
      await Complaint.find({
        createdBy: user._id,
      }).sort({
        createdAt: -1,
      });

    res.render(
      "employee/complaints",
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

/* =========================================
   CREATE COMPLAINT
========================================= */

router.get("/complaints/new", (req, res) => {
  res.render(
    "employee/create-complaint",
    {
      title:
        "Create Complaint",
    }
  );
});

router.post(
  "/complaints/new",
  async (req, res) => {

    try {

      const {
        title,
        description,
      } = req.body;

      const demoUser =
        await User.findOne({
          email:
            "vijendra@example.com",
        });

      // Enable these later

      // const predictedCategory =
      //   await predictCategory(
      //     title,
      //     description
      //   );

      // const priority =
      //   await predictPriority(
      //     title,
      //     description
      //   );

      const predictedCategory =
        "Network & Internet";

      const priority =
        "Medium";

      await Complaint.create({
        title,
        description,

        category:
          predictedCategory,

        predictedCategory,

        priority,

        createdBy:
          demoUser._id,
      });

      res.redirect(
        "/complaints"
      );

    } catch (error) {

      console.error(error);

      res.redirect(
        "/complaints/new"
      );

    }
  }
);

/* =========================================
   COMPLAINT DETAILS
========================================= */

router.get(
  "/complaints/:id",
  (req, res) => {

    res.render(
      "employee/complaint-details",
      {
        title:
          "Complaint Details",

        complaint: {
          title:
            "Office WiFi Not Working",

          description:
            "Internet disconnects every few minutes.",

          category:
            "Network & Internet",

          priority:
            "High",

          status:
            "Under Work",

          remarks:
            "Network team investigating.",

          createdAt:
            "2026-06-09",
        },
      }
    );

  }
);

/* =========================================
   PROFILE
========================================= */

router.get("/profile", (req, res) => {
  res.render(
    "employee/profile",
    {
      title: "Profile",

      employee: {
        employeeId:
          "EMP001",

        name:
          "Vijendra Chandra",

        email:
          "vijendra@example.com",

        department:
          "Engineering",

        designation:
          "Software Developer",

        role:
          "Employee",
      },
    }
  );
});

/* =========================================
   ADMIN DASHBOARD
========================================= */

router.get(
  "/admin/dashboard",
  (req, res) => {

    res.render(
      "admin/dashboard",
      {
        title:
          "Admin Dashboard",

        stats: {
          total: 124,
          pending: 43,
          resolved: 72,
          rejected: 9,
        },
      }
    );

  }
);

/* =========================================
   ADMIN COMPLAINTS
========================================= */

router.get(
  "/admin/complaints",
  (req, res) => {

    res.render(
      "admin/complaints",
      {
        title:
          "All Complaints",

        complaints: [
          {
            _id: "1",

            employee:
              "Vijendra Chandra",

            title:
              "Office WiFi Not Working",

            category:
              "Network & Internet",

            priority:
              "High",

            status:
              "Under Work",
          },

          {
            _id: "2",

            employee:
              "Rahul Sharma",

            title:
              "Salary Not Credited",

            category:
              "Payroll Issue",

            priority:
              "Critical",

            status:
              "Submitted",
          },
        ],
      }
    );

  }
);

/* =========================================
   ADMIN COMPLAINT DETAILS
========================================= */

router.get(
  "/admin/complaints/:id",
  (req, res) => {

    res.render(
      "admin/complaint-details",
      {
        title:
          "Complaint Details",

        complaint: {
          _id: "1",

          title:
            "Office WiFi Not Working",

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
      }
    );

  }
);

/* =========================================
   ANALYTICS
========================================= */

router.get(
  "/admin/analytics",
  (req, res) => {

    res.render(
      "admin/analytics",
      {
        title:
          "Analytics",

        stats: {
          total: 124,
          pending: 43,
          resolved: 72,
          rejected: 9,
        },
      }
    );

  }
);

/* =========================================
   EMPLOYEES
========================================= */

router.get(
  "/admin/employees",
  (req, res) => {

    res.render(
      "admin/employees",
      {
        title:
          "Employees",

        employees: [
          {
            employeeId:
              "EMP001",

            name:
              "Vijendra Chandra",

            email:
              "vijendra@example.com",

            department:
              "Engineering",

            role:
              "Employee",
          },

          {
            employeeId:
              "EMP002",

            name:
              "Rahul Sharma",

            email:
              "rahul@example.com",

            department:
              "HR",

            role:
              "Employee",
          },
        ],
      }
    );

  }
);

export default router;
