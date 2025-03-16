import { Reaction } from "./Reaction";
import { UserProfile } from "./UserProfile";

export interface Post {
  id: string;
  created_at: string;
  title: string;
  text: string;
  user_id: string;
  user_profile?: UserProfile;
  reactions?: Reaction[];
}
