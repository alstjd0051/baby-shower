import { GuestBook } from "@/comment";
import { fireStore } from "@/components/hooks/firebase/useFirebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const query = await getDoc(doc(fireStore, "baby", "guestbook"));
    const data = query.data();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const newComment = await req.json();
    const query = await updateDoc(doc(fireStore, "baby", "guestbook"), {
      comments: arrayUnion(newComment),
    });
    return NextResponse.json(query, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
