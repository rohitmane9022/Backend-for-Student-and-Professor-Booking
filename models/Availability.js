import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timeSlot: String,
  isBooked: { type: Boolean, default: false }
});

export default mongoose.model("Availability", availabilitySchema);
