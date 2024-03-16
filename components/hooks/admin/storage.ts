import { IAdminStorage } from "@/typing";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useMainSorage(slug?: string) {
  const { data: getAdmin, isLoading: getLoading } = useQuery<IAdminStorage[]>({
    queryKey: ["get storage", slug],
    queryFn: async () => {
      const res = await fetch(`/api/assets?slug=${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = res.json();
      return data;
    },
    gcTime: Infinity,
    retry: 1,
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
        cache: "no-store",
      }).then((res) => res.json());
      return req;
    },
    onSuccess: () => {
      toast.success("업로드 성공");
    },
  });
  return { getAdmin, POSTAdmin, getLoading };
}

export const useCarouselStorage = () => {
  const {} = useQuery({
    queryKey: ["get storage", "carousel"],
    queryFn: async () => {
      const res = await fetch(`/api/assets?slug=carousel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = res.json();
      return data;
    },
  });
};
