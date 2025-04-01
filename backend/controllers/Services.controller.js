import Service from "../models/Services.model.js";
import mongoose from "mongoose";


export const getServices = async (req, res) => {
    try {
      const services = await Service.find({});
      res.status(200).json({success:true, data: services});
    } catch (error) {
      console.log("Error in fetching services", error);
      res.status(404).json({success:false, message: "Error in fetching services"});
    }
  }


export const  createService = async (req, res) => {
    const service = req.body;
    
    if(!service.name || !service.price || !service.vendor || !service.location || !service.distance || !service.type || !service.rating){
      return res.status(400).json({error: 'Please fill all required fields'});
    }

    const newService=new Service(service);

    try {
        await newService.save();
        res.status(201).json({success:true, data:newService})
    } catch (error) {
        res.status(500).json({success:false, message: "Server Error"});
    }
  }


export const deleteService = async (req, res) => {
    const {id}= req.params;
   
    try {
      await Service.findByIdAndDelete(id);
      res.status(200).json({success:true, message: 'Service deleted successfully'});
    } catch (error) {
      res.status(500).json({success:false, message: "Product not found"});
    }


  }


export const updateService = async (req, res) => {
    const {id}=req.params;
    const service =req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).send('No service with that id');
    }

    try {
      const updatedService = await Service.findByIdAndUpdate(id, service, {new:true});  
        res.status(200).json({success:true, data: updatedService});
        }
        catch (error) {
        res.status(500).json({success:false, message: "Server Error"});
        }
    
    }
