"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

interface FormData {
  title: string;
  authors: string[]; // List of emails
  abstract: string;
  tags: string[];
  department: string;
  contactable: boolean;
  email?: string;
  urecApproved: boolean;
  accessLink?: string;
  hiddenByUserUntil?: number;
  hiddenByAdmin: boolean;
}

interface Error {
  title?: string;
  authors?: string;
  abstract?: string;
  department?: string;
  email?: string;
}

type Props = {
  formId: string;
  paperForm: FormData;
  forNewPaper?: boolean;
};

const Form = ({ formId, paperForm, forNewPaper = true }: Props) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: paperForm.title,
    authors: paperForm.authors.join(", "), // Authors will be a comma-separated string for easy input
    abstract: paperForm.abstract,
    tags: paperForm.tags.join(", "), // Tags will also be a comma-separated string
    department: paperForm.department,
    contactable: paperForm.contactable,
    email: paperForm.email || "",
    urecApproved: paperForm.urecApproved,
    accessLink: paperForm.accessLink || "",
    hiddenByUserUntil: paperForm.hiddenByUserUntil || 0,
    hiddenByAdmin: paperForm.hiddenByAdmin,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form: FormData) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/papers/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const { data } = await res.json();
      mutate(`/api/papers/${id}`, data, false);
      router.push("/");
    } catch (error) {
      setMessage("Failed to update paper");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form: FormData) => {
    try {
      const res = await fetch("/api/papers", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add paper");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const value =
      target.name === "contactable" || target.name === "urecApproved"
        ? (target as HTMLInputElement).checked
        : target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure paper info is filled for title, authors, abstract, and department */
  const formValidate = () => {
    let err: Error = {};
    if (!form.title) err.title = "Title is required";
    if (!form.authors) err.authors = "At least one author is required";
    if (!form.abstract) err.abstract = "Abstract is required";
    if (!form.department) err.department = "Department is required";
    if (form.contactable && !form.email)
      err.email = "Email is required if contactable is enabled";
    return err;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      const formattedForm = {
        ...form,
        authors: form.authors.split(",").map((author) => author.trim()), // Convert authors back to an array
        tags: form.tags.split(",").map((tag) => tag.trim()), // Convert tags back to an array
      };

      forNewPaper ? postData(formattedForm) : putData(formattedForm);
    } else {
      setErrors(errs);
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="authors">Authors (comma-separated emails)</label>
        <input
          type="text"
          name="authors"
          value={form.authors}
          onChange={handleChange}
          required
        />

        <label htmlFor="abstract">Abstract</label>
        <textarea
          name="abstract"
          value={form.abstract}
          onChange={handleChange}
          required
        />

        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
        />

        <label htmlFor="department">Department</label>
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <label htmlFor="contactable">Contactable</label>
        <input
          type="checkbox"
          name="contactable"
          checked={form.contactable}
          onChange={handleChange}
        />

        {form.contactable && (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </>
        )}

        <label htmlFor="urecApproved">UREC Approved</label>
        <input
          type="checkbox"
          name="urecApproved"
          checked={form.urecApproved}
          onChange={handleChange}
        />

        <label htmlFor="accessLink">Access Link (Optional)</label>
        <input
          type="url"
          name="accessLink"
          value={form.accessLink}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <ul>
        {Object.keys(errors).map((error, index) => (
          <li key={index}>{errors[error as keyof Error]}</li>
        ))}
      </ul>
    </>
  );
};

export default Form;
