import { useEffect, useState } from "react";
import { useAuthContext } from "@/context";
import { useUserProfileCrud } from "@/hooks";
import {
  FriendshipsList,
  ProfileCard,
  ProfileCardSecondary,
  ProfileForm,
} from "@/components";
import { UserProfile } from "@/types";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const { user } = useAuthContext();
  const { profileId } = useParams();
  const { loading, error, profile, fetchProfile } = useUserProfileCrud();
  const [profileToEdit, setProfileToEdit] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (profileId) {
      fetchProfile(profileId);
    } else {
      fetchProfile(user.id);
    }
  }, [fetchProfile, profileId, user.id]);

  const onProfileEdit = () => {
    setProfileToEdit(profile);
  };

  const onProfileSet = () => {
    setProfileToEdit(null);
    if (profileId) {
      fetchProfile(profileId);
    } else {
      fetchProfile(user.id);
    }
  };

  if (loading) {
    return <>loading...</>;
  }

  if (error || profileToEdit) {
    return (
      <ProfileForm
        profileToEdit={profileToEdit}
        onProfileSet={onProfileSet}
        onGoBack={() => setProfileToEdit(null)}
      />
    );
  }

  if (profile) {
    const isOwnProfile = profile.id === user.id;

    return isOwnProfile ? (
      <>
        <ProfileCard profile={profile} onProfileEdit={onProfileEdit} />

        <hr className="border-gray-400 my-4" />

        <FriendshipsList />
      </>
    ) : (
      <>
        <ProfileCardSecondary profile={profile} />
      </>
    );
  }

  return null;
};
