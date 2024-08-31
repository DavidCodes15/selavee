import mongoose from "mongoose";
// import { boolean } from "zod";

let isConnected = false; // track the connection
export const connectToDB = async () => {
  if (isConnected) return mongoose.connection;
  console.log(process.env.MONGODB_URL);
  
  

  try{
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
        dbName: "selavee-database",
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        connectTimeoutMS: 10000,  // Timeout after 10 seconds
        socketTimeoutMS: 45000,   // Close sockets after 45 seconds of inactivity
        serverSelectionTimeoutMS: 5000,
    //   useUnifiedTopology: true,

    })
    isConnected = true;
    console.log("mongo is connected")
    return mongoose.connection;
  } catch (error) {
    console.log("mongo did not connect");
    console.log(error);
  }
}