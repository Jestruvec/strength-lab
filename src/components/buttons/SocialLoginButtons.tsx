import { FaGoogle, FaFacebook } from "react-icons/fa";

export const SocialLoginButtons = () => {
  return (
    <div className="flex gap-2 mt-2">
      <button className="p-2 border rounded-md bg-gray-700 text-white cursor-pointer hover:opacity-90">
        <FaGoogle />
      </button>
      <button className="p-2 border rounded-md bg-gray-700 text-white cursor-pointer hover:opacity-90">
        <FaFacebook />
      </button>
    </div>
  );
};
