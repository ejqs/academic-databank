import mongoose, { Document, Schema, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Departments, Status, URECStatus, Visibility } from "../enums";

// Define the PaperData interface
interface PaperData {
  metadata: {
    owner: string;
    rankingBias: number;
    created: Date;
    lastModified: Date;
    hiddenByAdmin: boolean; // non overrideable visibility
    favoriteCount: number;
    visibility: String;
  };
  basic: {
    paperStatus: Status;
    datePaperFinished: Date; // date submitted or finished (?
    tags: string[];
    title: string;
    authors: string[];
    abstract: string;
    department: Departments;
    upvotes: number;
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
      rankingBias: { type: Number, default: 0 },
      created: { type: Date, default: Date.now },
      lastModified: { type: Date, default: Date.now },
      hiddenByAdmin: { type: Boolean, default: false },
      favoriteCount: { type: Number, default: 0 },
      visibility: {
        // user inputted
        type: String,
        enum: Object.values(Visibility),
        default: "private",
      },
    },
    basic: {
      paperStatus: { type: String, required: true },
      datePaperFinished: { type: Date, required: false }, // user inputted
      tags: { type: [String], required: false }, // user inputted
      title: { type: String, required: true },
      authors: { type: [String], required: true },
      abstract: { type: String, required: true },
      department: { type: String, required: true },
      upvotes: { type: Number, default: 0 },
    },
    selfDeclaration: {
      urecApproved: {
        type: String,
        enum: Object.values(URECStatus),
        required: true,
      },
      authorsAwareness: { type: Boolean, required: true },
      linkToPaper: { type: String, required: false },
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
