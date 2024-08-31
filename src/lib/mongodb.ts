import mongoose from "mongoose";
// import { boolean } from "zod";

let isConnected = false; // track the connection
export const connectToDB = async () => {
  if (isConnected) return mongoose.connection;
  console.log(process.env.MONGODB_URL);
  
  mongoose.set('strictQuery', true);

  try{
    await mongoose.connect(`${process.env.MONGODB_URL}`, {
        dbName: "selavee-database",
       
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