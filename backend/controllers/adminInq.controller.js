import mongoose from "mongoose";
import Inquiry from "../models/inquiry.model.js";

export const getAdminInquiries = async (req, res) => {
  try {
   
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    console.error("Error fetching inquiries for admin:", error);
    res.status(500).json({ success: false, message: "Error fetching inquiries for admin" });
  }
};




export const deleteAdminInquiry = async (req, res) => {
  const { id } = req.params;

  try {
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) {
      return res.status(404).json({ success: false, message: "Inquiry not found" });
    }
    res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({ success: false, message: "Error deleting inquiry" });
  }
};


export const updateAdminInquiry = async (req, res) => {
  const { id } = req.params;
  const { response, status } = req.body;

  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      { response, status }, 
      { new: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.status(200).json({ success: true, data: updatedInquiry });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({ success: false, message: 'Error updating inquiry' });
  }
};
