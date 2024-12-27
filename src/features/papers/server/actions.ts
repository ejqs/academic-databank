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

  console.log(formData);
  const schema = z.object({
    status: z.string(),
    title: z.string().min(1),
    authors: z.string().min(1),
    abstract: z.string().min(1),
    department: z.string().min(1),
    urecApproved: z.string(),
    linkToPaper: z.string().url().optional(),
    contactable: z.string().optional(),
    contactEmail: z.string().email().optional(),
    visibility: z.string(),
    tags: z.string().optional(),
  });

  const parse = schema.safeParse({
    status: formData.get("status"),
    title: formData.get("title"),
    authors: formData.get("authors"),
    abstract: formData.get("abstract"),
    department: formData.get("department"),
    urecApproved: formData.get("urecApproved"),
    linkToPaper: formData.get("linkToPaper"),
    contactable: formData.get("contactable"),
    contactEmail: formData.get("contactEmail"),
    visibility: formData.get("visibility"),
    tags: formData.get("tags"),
  });

  if (!parse.success) {
    return { message: `Parsing Error ${parse.error}`, redirect: "" };
  }

  try {
    const res = await Paper.create({
      metadata: {
        owner: session.user.email,
        tags: parse.data.tags,
        date: new Date(),
        created: new Date(),
        lastModified: new Date(),
        hiddenByAdmin: false,
        upvotes: 0,
        favorite: 0,
        visibility: parse.data.visibility,
      },
      basic: {
        title: parse.data.title,
        authors: parse.data.authors.split(","),
        abstract: parse.data.abstract,
        department: parse.data.department,
      },
      selfDeclaration: {
        urecApproved: parse.data.urecApproved,
        authorsAwareness: true,
        linkToPaper: parse.data.linkToPaper,
        contactable: parse.data.contactable === "on" ? true : false,
        contactEmail:
          parse.data.contactable === "true" ? parse.data.contactEmail : "",
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
