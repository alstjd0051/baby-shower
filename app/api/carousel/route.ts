import { fireStore } from "@/components/hooks/firebase/useFirebase";
import { IAdminStorage } from "@/typing";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const query = await getDoc(doc(fireStore, "assets", "carousel"));
    const data = query.data();
    const files = data?.files;
    // return NextResponse.json({ message: "" }, { status: 200 });
    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 200 });
  }
};

export const PUT = async (req: Request) => {
  const formData = await req.formData();
  const key = formData.get("key") as number | null;
  const carousel = formData.get("carousel") as string;
  const parseCarousel = JSON.parse(carousel) as IAdminStorage[];
  const images = formData.get("images") as File;
  // console.log("images", images.name);
  // console.log("carousel", carousel);
  // console.log("key", key);

  function modifyAtIndex({
    arr,
    index,
    element,
  }: {
    arr: IAdminStorage[];
    index: number;
    element?: any;
  }): IAdminStorage[] {
    if (index >= 0 && index <= 4) {
      if (element !== undefined) {
        arr.splice(index, 0, element);
      } else {
        arr.splice(index, 1);
      }
      return arr;
    } else {
      console.error(
        "Index out of range. Index should be between 0 and 4 inclusive."
      );

      return arr;
    }
  }

  // console.log(
  //   modifyAtIndex({ arr: parseCarousel!, index: key!, element: images })
  // );

  // const query = await getDoc(doc(fireStore, "assets", "carousel"));
  // const data = query.data();
  // const files = data?.files;
  // const newFiles = files.concat(file);
  // const newDoc = { files: newFiles };
  // await fireStore.collection("assets").doc("carousel").set(newDoc);
  return NextResponse.json({ message: "업로드 성공" }, { status: 200 });
};
