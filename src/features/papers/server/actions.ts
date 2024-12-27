"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";
import Paper from "./model/Paper";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ensureDBConnection } from "@/lib/ensureDB";

// Actions.ts Example https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/actions.ts

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

  console.log(formData);
  const schema = z.object({
    status: z.string(),
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

  // Random rant. Debugging why only one tag shows up even tho multiple was
  // inputted was a nightmare and took me the entire evening.
  // The solution I came up with is separating the schema of the tags
  // so that it can be processed separately.
  const tagSchema = z.object({
    tags: z.union([z.string().optional(), z.string().array().optional()]),
  });

  const formDataEntries = Object.fromEntries(formData.entries());
  const parse = schema.safeParse(formDataEntries);
  const parseTags = tagSchema.safeParse({
    tags: formData.getAll("tags"),
  });

  if (!parse.success) {
    return { message: `Parsing Error ${parse.error}`, redirect: "" };
  }

  try {
    const res = await Paper.create({
      metadata: {
        owner: session.user.email,
        date: new Date(),
        lastModified: new Date(),
        hiddenByAdmin: false,
        visibility: parse.data.visibility,
      },
      basic: {
        tags: parseTags.data.tags,
        created: new Date(),
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
export async function editPaper() {}
