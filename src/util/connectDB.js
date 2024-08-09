// From https://github.com/earlsab/swwwap
// https://medium.com/@nithishreddy0627/connecting-your-next-js-project-to-mongodb-atlas-using-mongoose-a-step-by-step-guide-2d2552b5d7ca

import mongoose from "mongoose";

// TODO: Investigate if this causes too many unwanted connections.
// FIXME: might have problem where it would create a new connection post/get request
const DATABASE_URL = process.env.MONGODB_URI;

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("Using cached connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      console.log("Using new connection.");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log("Using cached connection.");
  return cached.conn;
}

export default connectDB;
