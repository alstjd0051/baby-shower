import { addUser, client } from "@/components/lib/sanity/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { id, name, image, email, username, selector, phone, provider } =
    await req.json();
  try {
    const res = await client.createIfNotExists({
      _id: id,
      _type: "author",
      username,
      email,
      name,
      image,
      phone,
      selector,
      provider,
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
  /* await addUser({
    id: data.id,
    email: data.email,
    image: data.image,
    name: data.name,
    phone: data.phone,
    username: data.username || "",
  }); */
};
