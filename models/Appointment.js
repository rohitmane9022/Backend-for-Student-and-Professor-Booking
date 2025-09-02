import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timeSlot: String,
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" }
});

export default mongoose.model("Appointment", appointmentSchema);
