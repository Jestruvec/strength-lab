import { UserProfile } from "./UserProfile";

export interface Friendship {
  id: string;
  created_at: string;
  from: string;
  to: string;
  from_user?: UserProfile;
  to_user?: UserProfile;
}
