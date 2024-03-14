import { OAuthUser } from "@/typing";
import { useQuery } from "@tanstack/react-query";

export const useUsers = ({ id }: { id?: string }) => {
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

  return { data, isLoading };
};
