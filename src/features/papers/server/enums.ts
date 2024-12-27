// !!! File has to be separate from the model to allow importing in other areas

export enum Visibility {
  "private" = "private", // Won't show up anywhere
  "unlisted" = "unlisted", // Won't show up in browse
  "public" = "public", // Shows up in browse
  // TODO: public-boosted for consideration
  "public-boosted" = "public-boosted", // For future expansion; Shows up in homepage; boosting visibility might allow for a homepage discovery feature
}

export enum Status {
  "in-progress" = "in-progress", // show others its a work in progress
  "submitted" = "submitted", // show others it's submitted
  "published" = "published", // show others it has been published in a journal
}

// For future expansion
export enum Kind {
  "paper" = "paper",
  "question" = "question",
}

export enum URECStatus {
  "yes" = "yes",
  "not applied" = "not applied",
  "pending" = "pending",
  "no" = "no",
}

export enum Departments {
  "Agriculture" = "Agriculture",
  "Arts and Sciences" = "Arts and Sciences",
  "Business Administration" = "Business Administration",
  "Computer Studies" = "Computer Studies",
  "Education" = "Education",
  "Engineering and Design" = "Engineering and Design",
  "Law" = "Law",
  "Medicine" = "Medicine",
  "Nursing" = "Nursing",
  "Public Affairs and Governance" = "Public Affairs and Governance",
  "Rehabilitation Sciences" = "Rehabilitation Sciences",
  "Divinity School" = "Divinity School",
  "Performing and Visual Arts" = "Performing and Visual Arts",
}

export enum DefaultTags {
  "Science" = "Science",
  "Technology" = "Technology",
  "Engineering" = "Engineering",
  "Mathematics" = "Mathematics",
  "Humanities" = "Humanities",
  "Social Sciences" = "Social Sciences",
  "Arts" = "Arts",
  "Business" = "Business",
  "Law" = "Law",
  "Medicine" = "Medicine",
}
