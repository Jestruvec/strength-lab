import { ReactionTypesEnum } from "@/enums";

export interface Reaction {
  id: string;
  created_at: string;
  postId: string;
  userId: string;
  type: ReactionTypesEnum;
}
