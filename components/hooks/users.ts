import { useQuery } from "@tanstack/react-query";

export const useUsers = ({ id }: { id?: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["users", id],
    queryFn: async () => {
      const data = await fetch(`/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const res = await data.json();
      return res;
    },
  });
  return { data, isLoading };
};
