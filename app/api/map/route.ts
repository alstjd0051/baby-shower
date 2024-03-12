import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    return NextResponse.json({ message: "Hello, World!" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
