import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for the declarations
interface IDeclaration {
  "authors-awareness": boolean;
  "access-link"?: string;
  contactable: boolean;
  email?: string; // Only visible if contactable is true
  "urec-approved"?: boolean;
}

// Interface for the Paper Document
export interface IPaper extends Document {
  title: string;
  authors: string[]; // List of email addresses
  abstract: string;
  tags: string[]; // Tags, with validation to reject user input starting with 'admin_'
  adminTags: string[]; // Admin tags with the format `admin_`, `HEX COLOR`, `_Text`
  department: string;
  date: Date; // Date submitted/published
  created: Date; // Date the paper was created
  lastModified: Date; // Date the paper was last modified
  hiddenByAdmin: boolean; // Controls if paper is hidden by admin
  hiddenByUserUntil?: number; // Unix timestamp, optional
  declaration: IDeclaration; // Declaration fields
  status?: string; // Status, admin accessible
  meta: {
    upvotes: number;
    favorite: number;
  };
}

// Schema for the Paper Document
const PaperSchema = new Schema<IPaper>(
  {
    title: { type: String, required: true },
    authors: {
      type: [String],
      required: true,
      validate: {
        validator: function (emails: string[]) {
          // Validate email format
          return emails.every((email) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          );
        },
        message: "Authors must be valid email addresses.",
      },
    },
    abstract: { type: String, required: true },
    tags: {
      type: [String],
      validate: {
        validator: function (tags: string[]) {
          // Reject tags starting with 'admin_'
          return tags.every((tag) => !/^admin_/.test(tag));
        },
        message: 'Tags cannot start with "admin_".',
      },
    },
    adminTags: {
      type: [String], // Admin tags, structured format enforced in the UI
    },
    department: { type: String, required: true },
    date: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    hiddenByAdmin: { type: Boolean, default: false },
    hiddenByUserUntil: { type: Number }, // Unix timestamp, can be null if not hidden by user
    declaration: {
      // TODO: Change this to be required
      "authors-awareness": { type: Boolean },
      "access-link": { type: String },
      contactable: { type: Boolean },
      email: {
        type: String,
        validate: {
          validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
          message: "Invalid email",
        },
      }, // Email only visible if contactable
      "urec-approved": { type: Boolean },
      // Allows flexible schema upgrades without breaking compatibility
    },
    status: {
      type: String,
      enum: ["draft", "submitted", "approved", "rejected"],
      default: "draft",
    }, // Can be extended
    meta: {
      upvotes: { type: Number, default: 0 },
      favorite: { type: Number, default: 0 },
    },
  },
  { collection: "papers" }
);

PaperSchema.pre("save", function (next) {
  // Automatically update the last modified date before saving
  this.lastModified = new Date();
  next();
});

const Paper: Model<IPaper> =
  mongoose.models.Paper || mongoose.model<IPaper>("Paper", PaperSchema);

export default Paper;
