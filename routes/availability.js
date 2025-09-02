import express from "express";
import Availability from "../models/Availability.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();


router.post("/", authMiddleware(["professor"]), async (req, res) => {
  const { timeSlot } = req.body;
  const availability = new Availability({ professorId: req.user.id, timeSlot });
  await availability.save();
  res.status(201).json(availability);
});


router.get("/:profId", authMiddleware(["student"]), async (req, res) => {
  const slots = await Availability.find({ professorId: req.params.profId, isBooked: false });
  res.json(slots);
});

export default router;
