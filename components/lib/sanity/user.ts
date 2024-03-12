import { OAuthUser } from "@/typing";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET! || "production",
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: "2023-07-24", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client,
  ignoreBrowserTokenWarning: true,
});

export async function addUser({
  username,
  id,
  name,
  email,
  image,
  phone,
}: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "author",
    username,
    email,
    name,
    image,
    phone,
  });
}
