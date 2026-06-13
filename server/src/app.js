import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* -------------------- */
/* Middleware */
/* -------------------- */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.static(path.join(__dirname, "../public")));

import session from "express-session";
import MongoStore from "connect-mongo";

app.use(
  session({
    secret: process.env.JWT_SECRET,

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

/* -------------------- */
/* EJS */
/* -------------------- */

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "../views"));

app.use(expressLayouts);

app.set("layout", "./layouts/main");

/* -------------------- */
/* Global Template Data */
/* -------------------- */

app.use((req, res, next) => {
  res.locals.user =
    req.session.user || null;

  next();
});

/* -------------------- */
/* API Routes */
/* -------------------- */

app.use("/api/auth", authRoutes);

app.use("/api/complaints", complaintRoutes);

app.use("/api/admin/analytics", analyticsRoutes);

app.use("/api/admin", adminRoutes);

/* -------------------- */
/* View Routes */
/* -------------------- */

app.use("/", viewRoutes);

/* -------------------- */
/* 404 */
/* -------------------- */

app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found",
  });
});

export default app;
