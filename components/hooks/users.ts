import { OAuthUser } from "@/typing";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export const useUsers = ({ id }: { id?: string }) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<OAuthUser>({
    queryKey: ["users", id],
    queryFn: async () => {
      const data = await fetch(`/api/auth?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await data.json();
      return res;
    },
  });

  const { mutate: Signout } = useMutation({
    mutationKey: ["signout"],
    onMutate: async () => {
      await signOut();
      queryClient.clear();
    },
  });

  return { data, isLoading, Signout };
};
