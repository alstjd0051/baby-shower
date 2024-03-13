import { GuestBook } from "@/comment";
import { fireStore } from "@/components/hooks/firebase/useFirebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const query = await getDoc(doc(fireStore, "baby", "guestbook"));
    const { comments } = query.data() as { comments: GuestBook[] };
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {}
};

export const POST = async (req: Request) => {
  const newComment = await req.json();
  try {
    const query = await updateDoc(doc(fireStore, "baby", "guestbook"), {
      comments: arrayUnion(newComment),
    });
    return NextResponse.json(query, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
