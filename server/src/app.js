import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WITS API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);

export default app;