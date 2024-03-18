import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`DATABASE CONNECTED ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error :${error.message}`);
  }
};
