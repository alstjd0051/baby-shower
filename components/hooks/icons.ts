import { IconsProps } from "@/typing";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useIcons = () => {
  const { mutate: getIcons, data: Icon } = useMutation({
    mutationKey: ["icons"],
    mutationFn: async (title: string[]) => {
      const res = await fetch("/api/icons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      return res.json() as Promise<IconsProps[]>;
    },
  });

  return { getIcons, Icon };
};
