import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { FieldValues } from "react-hook-form";
import { GuestBook } from "@/comment";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useGuestBook = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: getData,
    isLoading: getLoading,
    isError: getError,
  } = useQuery<GuestBook[]>({
    queryKey: ["getGuestbook"],
    queryFn: async () => {
      const res = await fetch(`/api/guestbooks`, {
        method: "GET",
      }).then((res) => res.json());
      const { comments } = res as { comments: GuestBook[] };
      return comments;
    },
    gcTime: Infinity,
    retry: 1,
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

      const req = await fetch(`/api/guestbooks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }).then((res) => res.json());
      return req;
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getGuestbook"],
      });
      toast.success("댓글이 등록되었습니다.", {
        position: "bottom-right",
      });
      router.replace("#map", {
        scroll: true,
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { getData, postData, getLoading, getError };
};
