export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string;
  selector?: "public" | "master";
  cookie?: string;
};

export type OAuthUser = {
  id: string;
  email: string | null;
  name?: string;
  image?: string | null;
  username?: string;
  selector: "public" | "master";
};
