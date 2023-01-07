import mongoose from "mongoose";
mongoose.set("strictQuery", false);

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error.message);
  }
};
