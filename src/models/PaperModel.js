// Modified from https://github.com/earlsab/swwwap
// Example from https://mongoosejs.com/docs/guide.html

import mongoose from "mongoose";

const Item = mongoose.Schema(
  {
    hidden: Boolean,
    hidden_locked: Boolean,
    title: String,
    abstract: String,
    authors: [{ author: String }],
    department: String,
    date: String,
    created: Number,
    last_modified: Date, // 1 selling 0 sold
    meta: {
      votes: Number,
      favs: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Paper || mongoose.model("Paper", Paper);
