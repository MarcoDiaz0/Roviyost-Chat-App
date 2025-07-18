import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ChatApp");
    console.log("connected to database :-)");
  } catch (error) {
    console.error(error);
  }
};

