"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import Paper from "./model/Paper";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ensureDBConnection } from "@/lib/ensureDB";
import { parseSetCookie } from "next/dist/compiled/@edge-runtime/cookies";

// Actions.ts Example https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/actions.ts
const schema = z.object({
  id: z.string().optional(),
  status: z.string(),
  datePaperFinished: z.string().optional(),
  title: z.string().min(1),
  authors: z.string().min(1),
  abstract: z.string().min(1),
  department: z.string().min(1),
  urecApproved: z.string(),
  authorsAwareness: z.string(),
  linkToPaper: z.string().url().optional(),
  contactable: z.string().optional(),
  contactEmail: z.string().email().optional(),
  visibility: z.string(),
});
const tagSchema = z.object({
  tags: z.union([z.string().optional(), z.string().array().optional()]),
});
export async function createPaper(
  previousState: { message: string; redirect: string },
  formData: FormData,
): Promise<{ message: string; redirect: string }> {
  // TODO: Allow status for drafts, published papoer. Do not require all fields to save draft.
  // Check all fields to change status from draft to publish
  await ensureDBConnection();
  const session = await auth();
  if (!session?.user) return null;

  // Delete keys with empty values
  // https://stackoverflow.com/a/74104178 but modified with gpt4o
  for (const key of formData.keys()) {
    if (!formData.get(key) || formData.get(key) === "") {
      formData.delete(key);
    }
  }

  // Random rant. Debugging why only one tag shows up even tho multiple was
  // inputted was a nightmare and took me the entire evening.
  // The solution I came up with is separating the schema of the tags
  // so that it can be processed separately.

  const formDataEntries = Object.fromEntries(formData.entries());
  const parse = schema.safeParse(formDataEntries);
  const parseTags = tagSchema.safeParse({
    tags: formData.getAll("tags"),
  });
  console.log("PREPARSED");
  console.log(formData);
  if (!parse.success) {
    return { message: `Parsing Error ${parse.error}`, redirect: "" };
  }

  try {
    const res = await Paper.create({
      metadata: {
        owner: session.user.email,
        created: new Date(),
        lastModified: new Date(),
        visibility: parse.data.visibility,
      },
      basic: {
        paperStatus: parse.data.status,
        datePaperFinished: parse.data.datePaperFinished
          ? new Date(parse.data.datePaperFinished)
          : null,
        tags: parseTags.data.tags,
        title: parse.data.title,
        authors: parse.data.authors.split(","), // FIXME: Need better pasing method
        abstract: parse.data.abstract,
        department: parse.data.department,
      },
      selfDeclaration: {
        urecApproved: parse.data.urecApproved,
        authorsAwareness: parse.data.authorsAwareness === "on" ? true : false,
        linkToPaper: parse.data.linkToPaper,
        contactable: parse.data.contactable === "on" ? true : false,
        contactEmail:
          parse.data.contactable === "on" ? parse.data.contactEmail : "",
      },
    });
    console.log(res._id.toString());
    console.log(res.toString());
    revalidatePath("/");

    return {
      message: `Added paper: ${parse.data.title}.`,
      redirect: `/paper/${res._id.toString()}`,
    };
  } catch (e) {
    return { message: `Failed to create paper. ${e}`, redirect: "" };
  }
}

// TODO: Add reason for modification
export async function editPaper(
  previousState: { message: string; redirect: string },
  formData: FormData,
): Promise<{ message: string; redirect: string }> {
  await ensureDBConnection();
  const session = await auth();
  if (!session?.user) return null;

  for (const key of formData.keys()) {
    if (!formData.get(key) || formData.get(key) === "") {
      formData.delete(key);
    }
  }

  const formDataEntries = Object.fromEntries(formData.entries());
  const parse = schema.safeParse(formDataEntries);
  const parseTags = tagSchema.safeParse({
    tags: formData.getAll("tags"),
  });

  if (!parse.success) {
    return { message: `Parsing Error ${parse.error}`, redirect: "" };
  }
  try {
    const res = await Paper.findByIdAndUpdate(parse.data.id, {
      $set: {
        "metadata.visibility": parse.data.visibility,
        "metadata.lastModified": new Date(),
        "basic.paperStatus": parse.data.status,
        "basic.datePaperFinished": parse.data.datePaperFinished
          ? new Date(parse.data.datePaperFinished)
          : null,
        "basic.tags": parseTags.data.tags,
        "basic.title": parse.data.title,
        "basic.authors": parse.data.authors.split(","), // FIXME: Need better parsing method
        "basic.abstract": parse.data.abstract,
        "basic.department": parse.data.department,
        "selfDeclaration.urecApproved": parse.data.urecApproved,
        "selfDeclaration.authorsAwareness":
          parse.data.authorsAwareness === "on" ? true : false,
        "selfDeclaration.linkToPaper": parse.data.linkToPaper,
        "selfDeclaration.contactable":
          parse.data.contactable === "on" ? true : false,
        "selfDeclaration.contactEmail":
          parse.data.contactable === "on" ? parse.data.contactEmail : "",
      },
    });
    console.log(res._id.toString());
    revalidatePath("/");

    return {
      message: `Added paper: ${parse.data.title}.`,
      redirect: `/paper/${res._id.toString()}`,
    };
  } catch (e) {
    return { message: `Failed to create paper. ${e}`, redirect: "" };
  }
}
export async function deletePaper() {}
