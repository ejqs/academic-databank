import mongoose, { Document, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// Define the PaperData interface
interface PaperData {
  title: string;
  authors: string[];
  abstract: string;
  tags: string[];
  department: string;
  date: Date;
  created: Date;
  lastModified: Date;
  hiddenByAdmin: boolean;
  hiddenByUser?: number; // Unix timestamp, can be null if not hidden by user
  declaration: {
    signed: boolean;
    dateSigned: Date;
  };
  status: "draft" | "submitted" | "approved" | "rejected";
  meta: {
    upvotes: number;
    favorite: number;
  };
}

// Define the PaperDocument interface
interface PaperDocument extends Document, PaperData {}

// Define the PaperSchema
const PaperSchema = new Schema<PaperDocument>(
  {
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    abstract: { type: String, required: true },
    tags: { type: [String], required: true },
    department: { type: String, required: true },
    date: { type: Date, required: true },
    created: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    hiddenByAdmin: { type: Boolean, default: false },
    hiddenByUser: { type: Number }, // Unix timestamp, can be null if not hidden by user
    declaration: {
      signed: { type: Boolean, required: true },
      dateSigned: { type: Date, required: true },
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected"],
      default: "draft",
    },
    meta: {
      upvotes: { type: Number, default: 0 },
      favorite: { type: Number, default: 0 },
    },
  },
  { collection: "papers" },
);

// Apply the mongoose-paginate-v2 plugin to the schema
PaperSchema.plugin(mongoosePaginate);

// Create and export the Paper model
const Paper =
  mongoose.models.Paper ||
  mongoose.model<PaperDocument, mongoose.PaginateModel<PaperDocument>>(
    "Paper",
    PaperSchema,
    "papers",
  );

// const model = mongoose.model<
//   InstitutionDocument,
//   mongoose.PaginateModel<InstitutionDocument>
// >("Institutions", institutionSchema, "institutions");
export default Paper;
