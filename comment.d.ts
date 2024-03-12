export interface GuestBook {
  comments: Comments[];
}
interface Comments {
  name: string;
  message: string;
  timestamp: string;
}
