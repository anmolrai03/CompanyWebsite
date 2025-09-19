import { Router } from "express";
import { 
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} from "../controllers/contact-us.controller.js";

const router = Router();

// POST /contacts          → submit form
// GET /contacts           → list all contacts
router.route("/")
  .post(createContact)
  .get(getAllContacts);

// GET /contacts/:id       → single contact
// PATCH /contacts/:id     → update status
// DELETE /contacts/:id    → delete contact
router.route("/:id")
  .get(getContactById)
  .patch(updateContactStatus)
  .delete(deleteContact);

export default router;
