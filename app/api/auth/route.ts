import { client } from "@/components/lib/sanity/user";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { id } = await req.json();

  const querys = groq`*[_type =='author' && _id == "${id}" ]|order(_createdAt desc){
  "id": _id,
  image,
  username,
  name,
  email,
  phone
  }[0]
  `;

  try {
    const res = await client.fetch(querys, {}, { cache: "no-store" });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  const res = client.fetch(`*[_type == "author"]`);
};
