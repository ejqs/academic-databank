"use client";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { createPaper } from "../../server/actions";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  Departments,
  Status,
  URECStatus,
  Visibility,
} from "../../server/enums";
import { redirect } from "next/navigation";

// https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/add-form.tsx
const initialState = {
  message: "",
  redirect: "",
};

export function AddForm({ Tags }) {
  const [state, formAction] = useActionState(createPaper, initialState);
  const [contactable, setContactable] = useState(false);

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

  function SubmitButton() {
    const { pending } = useFormStatus();

    if (state.redirect != "") {
      redirect(state.redirect);
    }

    return (
      <button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    );
  }

  // TODO: Make it two parts
  return (
    <form action={formAction}>
      <label htmlFor="title">Paper Status</label>
      <Select id="status" name="status" options={paperStatusOptions} required />

      <label htmlFor="title">Enter Title</label>
      <input type="text" id="title" name="title" required />

      <label htmlFor="authors">Enter Authors separated by comma ,</label>
      <input type="text" id="authors" name="authors" required />

      <label htmlFor="abstract">Enter Abstract</label>
      <textarea id="abstract" name="abstract"></textarea>

      <label htmlFor="department">Enter Department</label>

      <Select
        id="department"
        name="department"
        options={departmentOptions}
        required
      />

      <label htmlFor="urecApproved">UREC Approved</label>
      <Select
        id="urecApproved"
        name="urecApproved"
        options={urecStatusOptions}
        required
      />
      <label htmlFor="authorsAwareness">Authors Awareness</label>
      <input
        type="checkbox"
        id="authorsAwareness"
        name="authorsAwareness"
        required
      />

      <label htmlFor="linkToPaper">Link to Paper (optional)</label>
      <input type="url" id="linkToPaper" name="linkToPaper" />

      <label htmlFor="contactable">Contactable</label>
      <input
        type="checkbox"
        id="contactable"
        name="contactable"
        onChange={(e) => setContactable(e.target.checked)}
      />

      {contactable && (
        <>
          <label htmlFor="contactEmail">Contact Email</label>
          <input type="email" id="contactEmail" name="contactEmail" required />
        </>
      )}

      <label htmlFor="visibility">Visibility</label>
      <Select
        id="visibility"
        name="visibility"
        options={visibilityOptions}
        required
      />

      <label htmlFor="visibility">Tags</label>
      <CreatableSelect id="tags" name="tags" options={Tags} isMulti />

      <SubmitButton />

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
function setState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}
