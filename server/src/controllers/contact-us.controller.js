import { Contact } from "../models/contact-us.model.js"; // your Mongoose model
// import { ApiError, ApiResponse, asyncHandler, uploadCloudinary } from "../utils"; // adjust path if needed
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { uploadCloudinary } from "../utils/multer.js"; // if you plan to use file uploads
//
import fs from "fs";

// Create a new contact (submit form)
export const createContact = asyncHandler(async (req, res, next) => {
  console.log("req")
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "All fields are required");
  }

  const contact = await Contact.create({ name, email, subject, message });

  res.status(201).json(new ApiResponse(201, contact, "Contact form submitted successfully"));
});

// Get all contacts (admin)
export const getAllContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, contacts, "Contacts fetched successfully"));
});

// Get a single contact by ID
export const getContactById = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  res.status(200).json(new ApiResponse(200, contact, "Contact fetched successfully"));
});

// Update contact status (admin)
export const updateContactStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  res.status(200).json(new ApiResponse(200, contact, "Contact status updated successfully"));
});

// Delete a contact (admin)
export const deleteContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  res.status(200).json(new ApiResponse(200, null, "Contact deleted successfully"));
});
