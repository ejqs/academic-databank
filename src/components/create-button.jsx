import "@app/globals.css";
import { allowCreatePosts } from "@/flags";

async function CreateButton() {
  const createPosts = await allowCreatePosts();

  if (!createPosts) return <>CANNOT Create Posts</>;
  return <>Create Posts</>;
}

export default CreateButton;
