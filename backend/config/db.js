import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected 🚀");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDb;
