import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (error) => {
      console.log("Error in connecting to MongoDB");
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting to Database");
    console.log(error);
  }
}
