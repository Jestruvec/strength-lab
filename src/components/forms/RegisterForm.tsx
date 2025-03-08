import { useState } from "react";
import { useAuthContext } from "@/context";
import { FormField, ErrorMessage } from "@/components";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error, loading, register } = useAuthContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    register(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <FormField
        id="email"
        type="email"
        placeholder="Email"
        value={username}
        setValue={setUsername}
        label="Email"
      />

      <FormField
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        setValue={setPassword}
        label="Password"
      />

      {error && <ErrorMessage message={error} />}

      <button
        type="submit"
        className="p-2  text-white rounded-md mt-7 bg-gray-700 cursor-pointer shadow-sm  hover:opacity-90"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};
