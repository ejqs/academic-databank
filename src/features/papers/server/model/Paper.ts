import mongoose, { Document, Schema, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Departments, URECStatus, Visibility } from "../enums";

// Define the PaperData interface
interface PaperData {
  metadata: {
    owner: string;
    tags: string[];
    date: Date; // date submitted or finished (?)
    created: Date;
    lastModified: Date;
    hiddenByAdmin: boolean; // non overrideable visibility
    upvotes: number;
    favorite: number;
    visibility: String;
  };
  basic: {
    title: string;
    authors: string[];
    abstract: string;
    department: Departments;
  };

  selfDeclaration: {
    urecApproved: URECStatus;
    authorsAwareness: boolean;
    linkToPaper: string;
    contactable: boolean;
    contactEmail: string;
  };
}

// Define the PaperDocument interface
interface PaperDocument extends Document, PaperData {}

// Define the PaperSchema
const PaperSchema = new Schema<PaperDocument>(
  {
    metadata: {
      owner: { type: String, required: true },
      tags: { type: [String], required: false }, // user inputted
      date: { type: Date, required: true },
      created: { type: Date, default: Date.now },
      lastModified: { type: Date, default: Date.now },
      hiddenByAdmin: { type: Boolean, default: false },
      upvotes: { type: Number, default: 0 },
      favorite: { type: Number, default: 0 },
      visibility: {
        // user inputted
        type: String,
        enum: Object.values(Visibility),
        default: "private",
      },
    },
    basic: {
      title: { type: String, required: true },
      authors: { type: [String], required: true },
      abstract: { type: String, required: true },
      department: { type: String, required: true },
    },
    selfDeclaration: {
      urecApproved: {
        type: String,
        enum: Object.values(URECStatus),
        required: true,
      },
      authorsAwareness: { type: Boolean, required: true },
      linkToPaper: { type: String, required: true },
      contactable: { type: Boolean, required: true },
      contactEmail: { type: String, required: false },
    },
  },
  { collection: "papers" },
);

// Apply the mongoose-paginate-v2 plugin to the schema
PaperSchema.plugin(mongoosePaginate);

// Create and export the Paper model
const Paper =
  (mongoose.models.Paper as mongoose.PaginateModel<PaperDocument>) ||
  mongoose.model<PaperDocument, mongoose.PaginateModel<PaperDocument>>(
    "Paper",
    PaperSchema,
    "papers", // looks to be responsible to accessing the collections in mongodb
  );

export default Paper;
