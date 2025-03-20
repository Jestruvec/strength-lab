import { FriendshipSuggestList, PostList } from "@/components";

export const Home = () => {
  return (
    <>
      <section>
        <FriendshipSuggestList />
      </section>

      <section>
        <PostList />
      </section>
    </>
  );
};
