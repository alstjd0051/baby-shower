import { client } from "@/components/lib/sanity/user";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { title } = (await req.json()) as { title: string[] };
  const querys = groq`
  *[_type =='icons' && title in $title ]|order(title asc){
    title,
    "iconUrl":icon.asset->url,
    description
}

  `;
  try {
    const res = await client.fetch(querys, {
      title: title,
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
