import express from "express";
import Appointment from "../models/Appointment.js";
import Availability from "../models/Availability.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();


router.post("/", authMiddleware(["student"]), async(req,res)=>{
  const {professorId, timeSlot} = req.body;
  const slot = await Availability.findOne({professorId, timeSlot, isBooked:false});
  if(!slot) return res.status(400).json({message:"Slot unavailable"});
  slot.isBooked = true;
  await slot.save();

  const appointment = new Appointment({student:req.user.id, professorId, timeSlot});
  await appointment.save();
  res.status(201).json(appointment);
});


router.delete("/:id", authMiddleware(["professor"]), async(req,res)=>{
  const appointment = await Appointment.findById(req.params.id);
  if(!appointment) return res.status(404).json({message:"Not found"});

  appointment.status = "cancelled";
  await appointment.save();
  await Availability.updateOne({professorId:appointment.professorId, timeSlot:appointment.timeSlot}, {isBooked:false});
  res.json({message:"Cancelled"});
});


router.get("/my", authMiddleware(["student"]), async(req,res)=>{
  const appointments = await Appointment.find({student:req.user.id});
  res.json(appointments);
});

export default router;
