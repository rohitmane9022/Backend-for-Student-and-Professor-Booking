import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGDB_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
