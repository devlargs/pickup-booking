import mongoose from "mongoose";

const connection: any = {};

async function dbConnect() {
  try {
    if (connection?.isConnected) {
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    connection.isConnected = db.connections[0].readyState;
  } catch (ex) {}
}

export default dbConnect;
