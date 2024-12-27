import { useActionState } from "react";
import {useFormStatus} from "react-dom";
import { createPaper } from "../../server/actions/papers";

// https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/add-form.tsx
const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = ();
}
export function AddForm() {
  const [state, formAction] = useActionState(createPaper, initialState);
}
