import { Router } from "express";
import contactRoutes from "./contact.routes.js";

const router = Router();

// All routes combined here
router.use("/contacts", contactRoutes);

export default router;
