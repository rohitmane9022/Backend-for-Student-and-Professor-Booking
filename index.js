import express from "express"
import dotenv from "dotenv";
import { db } from "./db.js";
import authRoutes from "./routes/auths.js";
import availabilityRoutes from "./routes/availability.js";
import appointmentRoutes from "./routes/appointments.js";


const app= express()
app.use(express.json());
dotenv.config();

db()

app.get("/",async(req,res)=>{
    res.send("hello Student and Professor")
})

app.use("/auth", authRoutes);
app.use("/availability", availabilityRoutes);
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});