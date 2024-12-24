import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  personal_email: String;
  permission_level: Number;
  last_submission_time: Number;
  rate_limit: Number;
  isFrozen: Boolean;
  iss: String;
  azp: String;
  aud: String;
  sub: String;
  hd: String;
  email: String;
  email_verified: Boolean;
  at_hash: String;
  name: String;
  picture: String;
  given_name: String;
  family_name: String;
  iat: Number;
  exp: Number;
}

const UserSchema = new Schema<IUser>(
  {
    personal_email: { type: String, required: false },
    permission_level: { type: Number, required: true },
    last_submission_time: { type: Number, required: true },
    rate_limit: { type: Number, required: true },
    isFrozen: { type: Boolean, required: true },
    iss: { type: String, required: true },
    azp: { type: String, required: true },
    aud: { type: String, required: true },
    sub: { type: String, required: true },
    hd: { type: String, required: true },
    email: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    at_hash: { type: String, required: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    given_name: { type: String, required: true },
    family_name: { type: String, required: true },
    iat: { type: Number, required: true },
    exp: { type: Number, required: true },
  },
  { collection: "users" },
);
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
