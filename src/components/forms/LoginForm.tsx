import { useState } from "react";
import { useAuthContext } from "@/context";
import { FormField, ErrorMessage } from "@/components";

export const LoginForm = () => {
  const [email, setEmail] = useState("jhonnyestruve@gmail.com");
  const [password, setPassword] = useState("123");
  const { error, loading, login } = useAuthContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <FormField
        id="email"
        type="email"
        placeholder="Email"
        value={email}
        setValue={setEmail}
        label="Email"
        required
      />
      <FormField
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        setValue={setPassword}
        label="Password"
        required
      />
      {error && <ErrorMessage message={error} />}
      <div className="flex justify-end mb-2">
        <span className="text-xs cursor-pointer text-gray-500 hover:underline">
          Forgot password?
        </span>
      </div>
      <button
        type="submit"
        className="p-2 text-white rounded-md bg-gray-700 cursor-pointer shadow-sm hover:opacity-90"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
