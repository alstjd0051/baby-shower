import { fireStore, storage } from "@/components/hooks/firebase/useFirebase";
import { IAdminStorage } from "@/typing";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const query = await getDoc(doc(fireStore, "assets", "main"));
    const data = query.data();
    const files = data?.files as IAdminStorage[] | undefined;

    switch (files?.length) {
      case 0:
        return NextResponse.json(
          { message: "No files found" },
          { status: 200 }
        );
        break;

      default:
        const lastfiles = files?.[files.length - 1];
        return NextResponse.json(lastfiles, { status: 200 });

        break;
    }
  } catch (error) {
    return NextResponse.json(error, { status: 200 });
  }
};

export const PUT = async (req: Request) => {
  const data = await req.formData();
  const images = data.getAll("images") as File[];

  try {
    images.forEach(async (image) => {
      const imageRef = ref(storage, `/main/${image.name}`);
      uploadBytes(imageRef, image).then(async () => {
        const files = {
          name: image.name,
          url: await getDownloadURL(imageRef).then((url) => url),
        };
        await updateDoc(doc(fireStore, "assets", "main"), {
          files: arrayUnion(files),
        });
      });
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
