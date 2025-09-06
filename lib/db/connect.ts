import mongoose from "mongoose";

let isConnected = false; // Track connection state

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("⚠️ MONGODB_URI is not defined in environment variables");
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState === 1;

    console.log("✅ MongoDB connected:", db.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};
