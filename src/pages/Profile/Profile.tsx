import { useEffect, useState } from "react";
import { useAuthContext } from "@/context";
import { useUserProfileCrud } from "@/hooks";
import { ProfileCard, ProfileForm } from "@/components";
import { UserProfile } from "@/types";

export const Profile = () => {
  const { user } = useAuthContext();
  const { loading, error, profile, fetchProfile } = useUserProfileCrud();
  const [profileToEdit, setProfileToEdit] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetchProfile(user.id);
  }, [fetchProfile, user.id]);

  const onProfileEdit = () => {
    setProfileToEdit(profile);
  };

  const onProfileSet = () => {
    setProfileToEdit(null);
    fetchProfile(user.id);
  };

  if (loading) {
    return <>loading</>;
  }

  if (error || !!profileToEdit) {
    return (
      <ProfileForm
        onProfileSet={onProfileSet}
        profileToEdit={profileToEdit}
        onGoBack={() => setProfileToEdit(null)}
      />
    );
  }

  if (profile) {
    return <ProfileCard profile={profile} onProfileEdit={onProfileEdit} />;
  }
};
