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

// https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/add-form.tsx
const initialState = {
  message: "",
};

export function AddForm({ Tags }) {
  const [step, setStep] = useState(1);
  const [formState, setFormState] = useState({});

  const [state, formAction] = useActionState(createPaper, initialState);

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

  function SubmitButton({ type }) {
    const { pending } = useFormStatus();

    if (type === "next") {
      return (
        <button
          type="submit"
          onClick={() => setStep(step + 1)}
          aria-disabled={pending}
        >
          Next
        </button>
      );
    } else if (type === "submit") {
      return (
        <button type="submit" aria-disabled={pending}>
          Add
        </button>
      );
    }
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

      <label htmlFor="linkToPaper">Link to Paper</label>
      <input type="url" id="linkToPaper" name="linkToPaper" required />

      <label htmlFor="contactable">Contactable</label>
      <input type="checkbox" id="contactable" name="contactable" />

      <label htmlFor="contactEmail">Contact Email</label>
      <input type="email" id="contactEmail" name="contactEmail" />

      <label htmlFor="visibility">Visibility</label>
      <Select
        defaultInputValue={"private"}
        id="visibility"
        name="visibility"
        options={visibilityOptions}
        required
      />

      <label htmlFor="visibility">Tags</label>
      <CreatableSelect id="tags" name="tags" options={Tags} isMulti />

      <SubmitButton type="submit" />

      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
