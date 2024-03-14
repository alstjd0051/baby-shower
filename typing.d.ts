export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  cookie?: string;
  selector: "master" | "public";
  provider?: string;
};
export type AuthProfile = {
  resultcode: string;
  message: string;
  response?: {
    id: string;
    profile_image: string;
    gender: string;
    email: string;
    mobile: string;
    mobile_e164: string;
    name: string;
    birthyear: string;
  };
};

export type OAuthUser = {
  id: string;
  email: string | null;
  name?: string;
  image?: string | null;
  username?: string;
  phone?: string;
  selector: string;
  provider: string;
};

export interface OpenModal {
  isModalOpen: boolean;
  setOpenModal: (value: boolean) => void;
  setCloseModal: (value: boolean) => void;
}
export interface IconsProps {
  title: string;
  iconUrl: string;
  description?: string;
}
