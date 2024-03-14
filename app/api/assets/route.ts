import { fireStore, storage } from "@/components/hooks/firebase/useFirebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") as string;
  try {
    const query = await getDoc(doc(fireStore, "assets", slug));
    const data = query.data();
    const files = data?.files;

    // return NextResponse.json({ message: "" }, { status: 200 });
    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 200 });
  }
};

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const images = formData.getAll("images") as File[];
  const slug = formData.get("slug") as string;

  try {
    images.forEach(async (image) => {
      const imageRef = ref(storage, `/${slug}/${image.name}`);
      uploadBytes(imageRef, image).then(async () => {
        const files = {
          name: image.name,
          url: await getDownloadURL(imageRef).then((url) => url),
        };
        await updateDoc(doc(fireStore, "assets", slug), {
          files: arrayUnion(files),
        });
      });
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
