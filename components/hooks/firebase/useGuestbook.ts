import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

import { FieldValues } from "react-hook-form";
import { fireStore } from "./useFirebase";
import { GuestBook } from "@/comment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useGuestBook = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: getData } = useQuery({
    queryKey: ["getGuestbook"],
    queryFn: async () => {
      const query = await getDoc(doc(fireStore, "baby", "guestbook"));
      return query.data() as GuestBook;
    },
  });

  const { mutateAsync: postData } = useMutation({
    mutationKey: ["addGuestbook"],
    mutationFn: async ({ name, message }: FieldValues) => {
      const newComment = {
        name,
        message,
        timestamp: new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      };
      const query = await updateDoc(doc(fireStore, "baby", "guestbook"), {
        comments: arrayUnion(newComment),
      });
      return query;
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getGuestbook"],
      });
      toast.success("댓글이 등록되었습니다.");
      router.replace("#map", {
        scroll: true,
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { getData, postData };
};
