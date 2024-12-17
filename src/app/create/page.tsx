// import Form from "@components/Form/Form";

export default function CreatePaper() {
  // Initial form data for creating a new paper
  const initialFormData = {
    title: "",
    authors: [""], // Start with an empty array or one empty author
    abstract: "",
    tags: [""], // Start with an empty array or one empty tag
    department: "",
    contactable: false,
    email: "",
    urecApproved: false,
    accessLink: "",
    hiddenByUserUntil: undefined, // Optional, so it's undefined initially
    hiddenByAdmin: false,
  };

  return (
    <div>
      <h1>Create a New Paper</h1>
      {/* <Form
        formId="create-paper-form"
        paperForm={initialFormData}
        forNewPaper={true} // Passing a boolean value as intended
      /> */}
    </div>
  );
}
