import mongoose from "mongoose";

export async function connect() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    const connection = db.connection;
    connection.on("connected", () => {
      console.log("MongoDB is connected");
    });
    connection.on("error", (error) => {
      console.log("MongoDB connection failed. ", error);
      process.exit();
    });

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
