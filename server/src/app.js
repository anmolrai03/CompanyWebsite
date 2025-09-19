import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";

// import userRouter from "./routes/user.routes.js";
import routeController from "./routes/routeController.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"], // allow frontend
    credentials: true,                  // allow cookies/auth headers if needed
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// Routes
// app.use("/api/v1/users", userRouter);
app.use("/api/v1", routeController);

export { app };
