import { UserProfile } from "./UserProfile";

export interface FriendshipRequest {
  id: string;
  created_at: string;
  from: string;
  to: string;
  user_profile: UserProfile;
}
