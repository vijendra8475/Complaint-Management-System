import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
  createComplaint,
  getMyComplaints,
  getComplaintById,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", protect, createComplaint);

router.get("/my", protect, getMyComplaints);

router.get("/:id", protect, getComplaintById);

export default router;