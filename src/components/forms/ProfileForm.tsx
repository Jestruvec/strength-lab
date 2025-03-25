import { useEffect, useState } from "react";
import {
  FormField,
  FormSelect,
  CustomButton,
  ErrorMessage,
} from "@/components";
import { useUserProfileCrud } from "@/hooks";
import { avatars, trainGoals } from "@/utils";
import { useAuthContext } from "@/context";
import { UserProfile } from "@/types";
import { FaArrowLeft } from "react-icons/fa";

interface ProfileFormProps {
  onProfileSet: () => void;
  onGoBack: () => void;
  profileToEdit?: UserProfile;
}

export const ProfileForm = ({
  onProfileSet,
  profileToEdit,
  onGoBack,
}: ProfileFormProps) => {
  const { user } = useAuthContext();
  const { loading, error, postProfile, putProfile } = useUserProfileCrud();
  const [formData, setFormData] = useState<UserProfile>({
    id: user.id,
    username: "",
    avatar: "",
    age: 0,
    height: 0,
    weight: 0,
    goal: 0,
  });

  useEffect(() => {
    if (profileToEdit) {
      setFormData(profileToEdit);
    }
  }, [profileToEdit]);

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !formData.username ||
      !formData.age ||
      !formData.height ||
      !formData.weight ||
      !formData.goal
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (profileToEdit) {
      await putProfile(formData.id, formData);
    } else {
      await postProfile(formData);
    }

    onProfileSet();
  };

  return (
    <>
      <div>
        <div className="flex gap-2 items-center">
          {profileToEdit && (
            <button onClick={onGoBack}>
              <FaArrowLeft />
            </button>
          )}

          <h1 className="text-2xl font-bold">
            {profileToEdit
              ? "Editar perfil de usuario"
              : "Crear perfil de usuario"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Avatar</label>

            <div className=" flex overflow-auto gap-1 border rounded-md border-gray-300 p-2">
              {avatars.map((avatar) => {
                return (
                  <img
                    key={avatar.name}
                    className={`w-20 min-w-20 min-h-20 h-20 border rounded-full border-gray-500 cursor-pointer hover:opacity-50 ${
                      formData.avatar === avatar.url && "bg-amber-300"
                    }`}
                    src={avatar.url}
                    alt={avatar.name}
                    onClick={() => handleChange("avatar", avatar.url)}
                  />
                );
              })}
            </div>

            <FormField
              id="Nombre de usuario"
              type="text"
              placeholder="Nombre de usuario"
              value={formData.username}
              setValue={(value) => handleChange("username", value)}
              label="Nombre de usuario"
              required
            />

            <FormField
              id="Edad"
              type="number"
              placeholder="Edad"
              value={formData.age}
              setValue={(value) => handleChange("age", value)}
              label="Edad en años"
              required
            />

            <FormField
              id="Altura"
              type="number"
              placeholder="Altura"
              value={formData.height}
              setValue={(value) => handleChange("height", value)}
              label="Altura en centimetros"
              required
            />

            <FormField
              id="Peso"
              type="number"
              placeholder="Peso"
              value={formData.weight}
              setValue={(value) => handleChange("weight", value)}
              label="Peso en kilos"
              required
            />

            <FormSelect
              id="Objetivo"
              value={formData.goal}
              setValue={(value) => handleChange("goal", value)}
              label="Objetivo"
              required
              options={trainGoals}
            />

            {error && <ErrorMessage message={error} />}

            <CustomButton type="submit" disabled={loading} loading={loading} />
          </div>
        </form>
      </div>
    </>
  );
};
