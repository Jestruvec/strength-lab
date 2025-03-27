import { useState } from "react";
import { Post } from "@/types";
import { usePostsCrud } from "@/hooks";
import { FormField, CustomButton } from "@/components";
import { useAuthContext } from "@/context";

interface ComponentProps {
  onPostPost: () => void;
}

export const PostForm = ({ onPostPost }: ComponentProps) => {
  const { user } = useAuthContext();
  const { postPost } = usePostsCrud();
  const [post, setPost] = useState<Post>({
    title: null,
    text: "",
    user_id: user.id,
  } as Post);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await postPost(post);

    resetForm();
    onPostPost();
  };

  const resetForm = () => {
    setPost({
      title: null,
      text: "",
      user_id: user.id,
    } as Post);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="flex-1">
        <FormField
          id="post-text"
          placeholder="En que estas pensando?"
          type="text"
          value={post.text}
          setValue={(newValue) => setPost({ ...post, text: newValue })}
          required
        />
      </div>

      <CustomButton label="Publicar" type="submit" />
    </form>
  );
};
