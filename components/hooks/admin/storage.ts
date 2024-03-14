import { IAdminStorage } from "@/typing";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useMainSorage(slug?: string) {
  const { data: getAdmin, isLoading: getLoading } = useQuery<IAdminStorage[]>({
    queryKey: ["get storage", slug],
    queryFn: async () => {
      const res = await fetch(`/api/assets?slug=${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();
      return data;
    },
  });
  const { mutate: POSTAdmin } = useMutation({
    mutationKey: ["post admin-storage"],
    mutationFn: async ({
      image,
      slug,
    }: Partial<{ image: FileList; slug: string }>) => {
      const formData = new FormData();
      if (image) {
        for (let i = 0; i < image.length; i++) {
          formData.append("images", image[i], image[i].name);
        }
      } else {
        formData.append("images", ""); // or formData.append("images", null);
      }
      formData.append("slug", slug || "");
      const req = await fetch(`/api/assets`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      return req;
    },
  });
  return { getAdmin, POSTAdmin, getLoading };
}
