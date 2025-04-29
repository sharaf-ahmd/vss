import mongoose from "mongoose";
import Inquiry from "../models/inquiry.model.js";


export const getInquiry = async (req, res) => {

  const { email } = req.query;

  try {
    const inquiries = await Inquiry.find({email:email}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Error fetching user inquiries:", error);
    res.status(500).json({ success: false, message: "Error fetching user inquiries" });
  }
};


export const createInquiry = async (req, res) => {
  const inquiry = req.body;

  if (!inquiry.user || !inquiry.email || !inquiry.message) {
    return res.status(400).json({ success: false, message: 'Please fill all required fields' });
  }

  const newInquiry = new Inquiry(inquiry);

  try {
    await newInquiry.save();
    res.status(201).json({ success: true, data: newInquiry });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deleteInquiry = async (req, res) => {
  const { id } = req.params;

  try {
    await Inquiry.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Inquiry not found or already deleted" });
  }
};

