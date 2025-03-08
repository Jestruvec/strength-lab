type ButtonType = "button" | "submit" | "reset";

interface CustomButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const CustomButton = ({
  type = "button",
  label = "Guardar",
  onClick,
  disabled,
  loading,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-2 text-white rounded-md bg-gray-700 cursor-pointer shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};
