import "@/globals.css";
import { allowCreatePosts } from "@/flags";

export async function CreateButton() {
  const createPosts = await allowCreatePosts();

  if (!createPosts) return <>CANNOT Create Posts</>;
  return <>Create Posts</>;
}
