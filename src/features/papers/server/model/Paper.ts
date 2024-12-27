import mongoose, { Document, Schema, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export enum Visibility {
  "private", // Won't show up anywhere
  "unlisted", // Won't show up in browse
  "public", // Shows up in browse
  // TODO: public-boosted for consideration
  "public-boosted", // For future expansion; Shows up in homepage; boosting visibility might allow for a homepage discovery feature
}

export enum Status {
  "in-progress", // show others its a work in progress
  "submitted", // show others it's submitted
  "published", // show others it has been published in a journal
}

// For future expansion
export enum Kind {
  "paper",
  "question",
}

export enum URECStatus {
  "yes",
  "not applied",
  "pending",
  "no",
}

export enum Departments {}

// Define the PaperData interface
interface PaperData {
  metadata: {
    tags: string[];
    date: Date;
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
      tags: { type: [String], required: false },
      date: { type: Date, required: true },
      created: { type: Date, default: Date.now },
      lastModified: { type: Date, default: Date.now },
      hiddenByAdmin: { type: Boolean, default: false },
      upvotes: { type: Number, default: 0 },
      favorite: { type: Number, default: 0 },
      visibility: {
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
      contactEmail: { type: String, required: true },
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

// const model = mongoose.model<
//   InstitutionDocument,
//   mongoose.PaginateModel<InstitutionDocument>
// >("Institutions", institutionSchema, "institutions");

export default Paper;
