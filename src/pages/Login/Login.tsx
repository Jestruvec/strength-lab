import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm, RegisterForm } from "@/components";
import { useAuthContext } from "@/context";

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/app/home");
    }
  }, [user, navigate]);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4  h-[100vh]">
      <div className="flex flex-col items-center justify-center w-80 border p-4 rounded-md border-dashed border-gray-300">
        <h1 className="text-2xl font-bold mb-4">
          {isLogin ? "Login" : "Register"}
        </h1>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <div className="mt-4">
          <button
            onClick={toggleForm}
            className="text-sm text-gray-500 hover:underline cursor-pointer"
          >
            {isLogin
              ? "Don't have an account? Register now!"
              : "Already have an account? Login!"}
          </button>
        </div>

        {/* <SocialLoginButtons /> */}
      </div>
    </div>
  );
};
