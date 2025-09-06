import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        if (mongoose.connections[0].readyState) {
            console.log(mongoose.connections[0].readyState)
            console.log("MongoDB already connected")
            return
        }
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB not connected")
    }
}