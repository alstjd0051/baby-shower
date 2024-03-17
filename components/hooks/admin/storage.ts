import { IAdminStorage } from "@/typing";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const queryClient = new QueryClient();

export const useMainImage = () => {
  const { data: getMainImg, isLoading } = useQuery({
    queryKey: ["mainImage"],
    queryFn: async () => {
      const res = await fetch(`/api/main`, {
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
    staleTime: Infinity,
  });
  const { mutate: PUTAdmin } = useMutation({
    mutationKey: ["putMainImg"],
    mutationFn: async ({
      image,
    }: Partial<{ image: FileList; slug: string }>) => {
      console.log(image);
      const formData = new FormData();
      if (image) {
        for (let i = 0; i < image.length; i++) {
          formData.append("images", image[i], image[i].name);
        }
      } else {
        formData.append("images", ""); // or formData.append("images", null);
      }
      const req = await fetch(`/api/main`, {
        method: "PUT",
        body: formData,
        cache: "no-store",
      }).then((res) => res.json());
      return req;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mainImage"],
      });
      toast.success("업로드 성공");
    },
  });
  return { getMainImg, isLoading, PUTAdmin };
};

export const useCarousel = () => {
  const { data: getCarousel, isLoading } = useQuery<IAdminStorage[]>({
    queryKey: ["carousel"],
    queryFn: async () => {
      const res = await fetch(`/api/carousel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
      const data = res.json();
      return data;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const { mutate: changeData } = useMutation({
    mutationKey: ["chagneCarousel"],
    mutationFn: async ({
      image,
      carousel,
      key,
    }: Partial<{
      image: FileList;
      carousel: IAdminStorage[];
      key: number | null;
    }>) => {
      const formData = new FormData();
      if (image) {
        for (let i = 0; i < image.length; i++) {
          formData.append("images", image[i], image[i].name);
        }
        formData.append("carousel", JSON.stringify(carousel));
        formData.append("key", JSON.stringify(key));
      } else {
        formData.append("images", ""); // or formData.append("images", null);
      }

      const req = await fetch(`/api/carousel`, {
        method: "PUT",
        body: formData,
        cache: "no-store",
      });
      const data = req.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carousel"],
      });
      toast.success("업로드 성공");
    },
  });

  return { getCarousel, isLoading, changeData };
};

export function useMainSorage(slug?: string) {
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

  return { POSTAdmin };
}
