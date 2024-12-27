// import Form from "@components/Form/Form";

import { AddForm } from "@/features/papers/components/forms/AddForm";
import { DefaultTags } from "@/features/papers/server/enums";

export default function CreatePaper() {
  // Initial form data for creating a new paper

  //TODO: Allow fetching the most commonly used tags from database
  const tags = Object.values(DefaultTags).map((tags) => ({
    value: tags,
    label: tags,
  }));

  // Useful Reference: https://www.youtube.com/watch?v=dDpZfOQBMaU
  return (
    <div>
      <h1>Create a New Paper</h1>
      <AddForm Tags={tags}></AddForm>
    </div>
  );
}
