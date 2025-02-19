import mongoose from "mongoose";

export const connectDB = async () => {
    // console.log("Connecting to ", process.env.MONGODB_URI)
    // try {
    //     await mongoose.connect(process.env.MONGODB_URI, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true,
    //         useCreateIndex: true,
    //     });
    //     console.log("MongoDB connected...");
    // } catch (error) {
    //     console.error("Error connecting to MongoDB:", error.message);
    //     process.exit(1);
    // }
    await mongoose.connect('mongodb+srv://minhduccode:DXZFfxFQmw5hfCXi@cluster0.n0osb.mongodb.net/food').then(() => {
        console.log('Connected to MongoDB!')
    })
}