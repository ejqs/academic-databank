// Can be found in src/auth.config.ts

// Modified from https://github.com/earlsab/swwwap
// Example from https://mongoosejs.com/docs/guide.html

import mongoose from "mongoose";

// TODO: Check if there is UNIX time format
const User = new mongoose.Schema(
  {
    personal_email: String,
    permission_level: Number,
    frozen: Boolean,
    last_submission_time: Number,
    rate_limit: Number,
    isFrozen: Boolean,
    favorites: Array,
    iss: String,
    azp: String,
    aud: String,
    sub: String,
    hd: String,
    email: String,
    email_verified: Boolean,
    at_hash: String,
    name: String,
    picture: String,
    given_name: String,
    family_name: String,
    iat: Number,
    exp: Number,
    emailVerified: Boolean,
  },
  {
    timestamps: true,
  },
  {
    collection: "users",
  }
);

export default mongoose.models && mongoose.models.User
  ? mongoose.models.User
  : mongoose.model("User", User);
