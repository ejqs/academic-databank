"use client";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createPaper, editPaper } from "../../server/actions";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  Departments,
  Status,
  URECStatus,
  Visibility,
} from "../../server/enums";
import { redirect } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";

// https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/add-form.tsx
const initialState = {
  message: "",
  redirect: "",
};
const departmentOptions = Object.values(Departments).map((department) => ({
  value: department,
  label: department,
}));

const urecStatusOptions = Object.values(URECStatus).map((status) => ({
  value: status,
  label: status,
}));

const paperStatusOptions = Object.values(Status).map((status) => ({
  value: status,
  label: status,
}));

const visibilityOptions = Object.values(Visibility).map((visibility) => ({
  value: visibility,
  label: visibility,
}));

export function PaperForm({ Tags, existingPaper }) {
  let formFunction;
  if (!existingPaper) {
    formFunction = createPaper;
  } else {
    formFunction = editPaper;
  }

  const [state, formAction] = useActionState(formFunction, initialState);

  const [dateCompleted, setDateCompleted] = useState<Date | null>(
    existingPaper?.basic?.datePaperFinished
      ? new Date(existingPaper?.basic?.datePaperFinished)
      : null,
  );
  const [contactable, setContactable] = useState(
    !!existingPaper?.selfDeclaration?.contactable,
  );
  const [loading, setLoading] = useState(true);
  const DefaultTags = Object.values(Tags).map((tags) => ({
    value: tags,
    label: tags,
  }));
  const [formData, setFormData] = useState({
    id: "",
    status: "",
    datePaperFinished: null,
    title: "",
    authors: "",
    abstract: "",
    department: "",
    urecApproved: "",
    authorsAwareness: false,
    linkToPaper: "",
    contactable: false,
    contactEmail: "",
    visibility: "",
    tags: [],
  });

  useEffect(() => {
    if (existingPaper) {
      setFormData({
        id: existingPaper?._id,
        status: existingPaper.basic?.paperStatus || "",
        datePaperFinished: existingPaper.basic?.datePaperFinished || "",
        title: existingPaper.basic?.title || "",
        authors: existingPaper.basic?.authors?.join(",") || "",
        abstract: existingPaper.basic?.abstract || "",
        department: existingPaper.basic?.department || "",
        urecApproved: existingPaper.selfDeclaration?.urecApproved || "",
        authorsAwareness: !!existingPaper.selfDeclaration?.authorsAwareness,
        linkToPaper: existingPaper.selfDeclaration?.linkToPaper || "",
        contactable: !!existingPaper.selfDeclaration?.contactable,
        contactEmail: existingPaper.selfDeclaration?.contactEmail || "",
        visibility: existingPaper.metadata?.visibility || "",
        tags: existingPaper.basic?.tags || [],
      });
    }

    setLoading(false);
  }, [existingPaper]);

  function SubmitButton() {
    const { pending } = useFormStatus();

    if (state.redirect) {
      redirect(state.redirect);
    }
    return (
      <button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    );
  }

  // if (loading) {
  if (loading) {
    return <>Loading</>;
  }
  // TODO: Make it two parts
  return (
    <>
      <form id="paperform" action={formAction}>
        <input type="hidden" name="id" id="id" value={formData?.id}></input>

        <label htmlFor="status">Paper Status</label>
        <Select
          id="status"
          name="status"
          options={paperStatusOptions}
          value={paperStatusOptions.find(
            (opt) => opt.value === formData.status,
          )}
          onChange={(selectedOption) =>
            setFormData({ ...formData, status: selectedOption.value })
          }
          required
        />
        {formData.status != "in-progress" && formData.status != "" && (
          <>
            <label htmlFor="date">Date Completed</label>
            <DatePickerInput
              id="datePaperFinished"
              label="Pick date"
              placeholder="Pick date"
              value={dateCompleted}
              onChange={setDateCompleted}
            />
            <input
              type="hidden"
              name="datePaperFinished"
              id="datePaperFinished"
              value={dateCompleted ? dateCompleted?.toISOString() : ""}
            ></input>
          </>
        )}
        <label htmlFor="title">Enter Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={formData.title}
        />

        <label htmlFor="authors">Enter Authors separated by comma ,</label>
        <input
          type="text"
          id="authors"
          name="authors"
          required
          defaultValue={formData.authors}
        />

        <label htmlFor="abstract">Enter Abstract</label>
        <textarea
          id="abstract"
          name="abstract"
          defaultValue={formData.abstract}
        />

        <label htmlFor="department">Enter Department</label>
        <Select
          id="department"
          name="department"
          options={departmentOptions}
          value={departmentOptions.find(
            (opt) => opt.value === formData.department,
          )}
          onChange={(selectedOption) =>
            setFormData({ ...formData, department: selectedOption.value })
          }
          required
        />

        <label htmlFor="urecApproved">UREC Approved</label>
        <Select
          id="urecApproved"
          name="urecApproved"
          options={urecStatusOptions}
          value={urecStatusOptions.find(
            (opt) => opt.value === formData.urecApproved,
          )}
          onChange={(selectedOption) =>
            setFormData({ ...formData, urecApproved: selectedOption.value })
          }
          required
        />

        <label htmlFor="authorsAwareness">Authors Awareness</label>
        <input
          type="checkbox"
          id="authorsAwareness"
          name="authorsAwareness"
          checked={formData.authorsAwareness}
          onChange={(e) =>
            setFormData({ ...formData, authorsAwareness: e.target.checked })
          }
          required
        />

        <label htmlFor="linkToPaper">Link to Paper (optional)</label>
        <input
          type="url"
          id="linkToPaper"
          name="linkToPaper"
          defaultValue={formData.linkToPaper}
        />

        <label htmlFor="contactable">Contactable</label>
        <input
          type="checkbox"
          id="contactable"
          name="contactable"
          checked={formData.contactable}
          onChange={(e) => {
            setContactable(e.target.checked);
            setFormData({ ...formData, contactable: e.target.checked });
          }}
        />

        {contactable && (
          <>
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              required
              defaultValue={formData.contactEmail}
            />
          </>
        )}

        <label htmlFor="visibility">Visibility</label>
        <Select
          id="visibility"
          name="visibility"
          options={visibilityOptions}
          value={visibilityOptions.find(
            (opt) => opt.value === formData.visibility,
          )}
          onChange={(selectedOption) =>
            setFormData({ ...formData, visibility: selectedOption.value })
          }
          required
        />

        <label htmlFor="visibility">Tags</label>
        <CreatableSelect
          id="tags"
          name="tags"
          isMulti
          options={DefaultTags}
          value={formData.tags.map((tag) => ({ value: tag, label: tag }))}
          onChange={(selectedOptions) =>
            setFormData({
              ...formData,
              tags: selectedOptions.map((option) => option.value),
            })
          }
        />

        <SubmitButton />

        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </>
  );
}
