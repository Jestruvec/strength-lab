import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context";
import { useUserProfileCrud } from "@/hooks";
import { ProfileForm } from "@/components";

export const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { loading, error, profile, fetchProfile } = useUserProfileCrud();

  useEffect(() => {
    fetchProfile(user.id);
  }, [fetchProfile, user.id]);

  if (loading) {
    return <>loading</>;
  }

  if (error) {
    return <ProfileForm onProfileSet={() => navigate("/profile")} />;
  }

  if (profile) {
    return (
      <>
        <h1>{`Hola ${profile.username}`}</h1>
        <div className=" h-full flex items-center justify-center flex-col">
          <img
            src={profile.avatar}
            alt={profile.username}
            className="opacity-20"
          />
        </div>
      </>
    );
  }
};
