import { useState } from "react";
import {
  FormField,
  FormSelect,
  CustomButton,
  ErrorMessage,
} from "@/components";
import { useUserProfileCrud } from "@/hooks";
import { avatars } from "@/utils";
import { useAuthContext } from "@/context";
import { UserProfile } from "@/types";

interface ProfileFormProps {
  onProfileSet: () => void;
}

export const ProfileForm = ({ onProfileSet }: ProfileFormProps) => {
  const { user } = useAuthContext();
  const { loading, error, postProfile } = useUserProfileCrud();
  const [formData, setFormData] = useState<UserProfile>({
    id: user.id,
    username: "",
    avatar: "",
    age: undefined,
    height: undefined,
    weight: undefined,
    goal: undefined,
  });

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

    await postProfile(formData);

    onProfileSet();
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Crear perfil de usuario</h1>

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
              options={[
                { value: 0, label: "Seleccionar objetivo" },
                { value: 1, label: "Aumentar masa muscular" },
                { value: 2, label: "Disminuir grasa corporal" },
                { value: 3, label: "Aumentar condición física" },
              ]}
            />

            {error && <ErrorMessage message={error} />}

            <CustomButton type="submit" disabled={loading} loading={loading} />
          </div>
        </form>
      </div>
    </>
  );
};
