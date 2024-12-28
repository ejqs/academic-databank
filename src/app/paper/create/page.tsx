// import Form from "@components/Form/Form";

import { PaperForm } from "@/features/papers/components/forms/PaperForm";
import { DefaultTags } from "@/features/papers/server/enums";

export default function CreatePaper() {
  // Initial form data for creating a new paper

  //TODO: Allow fetching the most commonly used tags from database

  // Tags are processed like
  // const DefaultTags = Object.values(Tags).map((tags) => ({
  //   value: tags,
  //   label: tags,
  // }));
  // Useful Reference: https://www.youtube.com/watch?v=dDpZfOQBMaU
  return (
    <div>
      <h1>Create a New Paper</h1>
      <PaperForm Tags={DefaultTags} existingPaper={undefined}></PaperForm>
    </div>
  );
}
