import mongoose, { Document, Schema, Model } from "mongoose";

interface IFeatures {
  allowCreatePosts: boolean;
  allowPersonalEmails: boolean;
}
export interface IFlags extends Document {
  features: IFeatures;
}
// TODO: Fix this, make it adapt to different names, etc
const FlagSchema = new Schema<IFlags>(
  {
    features: {
      allowCreatePosts: Boolean,
      allowPersonalEmails: Boolean,
    },
  },
  { collection: "features" },
);

const Flags: Model<IFlags> =
  mongoose.models.Flags || mongoose.model<IFlags>("Flags", FlagSchema);

export default Flags;
