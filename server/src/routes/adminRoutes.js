import express from "express";

import protect from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminMiddleware.js";

import {
  getAllComplaints,
  updateComplaintStatus,
  updateComplaintRemarks
} from "../controllers/adminControllers.js";

const router = express.Router();

router.get(
  "/complaints",
  protect,
  adminOnly,
  getAllComplaints
);

router.patch(
  "/complaints/:id/status",
  protect,
  adminOnly,
  updateComplaintStatus
);

router.patch(
  "/complaints/:id/remarks",
  protect,
  adminOnly,
  updateComplaintRemarks
);

export default router;