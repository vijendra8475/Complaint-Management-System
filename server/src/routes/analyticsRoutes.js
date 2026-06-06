import express from "express";

import protect from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminMiddleware.js";

import {
  getAnalytics,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.get(
  "/",
  protect,
  adminOnly,
  getAnalytics
);

export default router;