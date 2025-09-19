import { Router } from "express";
import contactRoutes from "./contact-us.routes.js";

const router = Router();

// Mount contact routes at /contacts
router.use("/contacts", contactRoutes);

export default router;
