type ButtonType = "button" | "submit" | "reset";
type ButtonSize = "sm" | "md" | "lg";

interface CustomButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  size?: ButtonSize;
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
  size = "md",
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white rounded-md bg-gray-700 cursor-pointer shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${
        size === "md" || size === "lg" ? "p-2" : ""
      }`}
      disabled={disabled || loading}
    >
      <span className={`${size === "sm" ? "text-xs" : ""}`}>
        {loading ? "Loading..." : label}
      </span>
    </button>
  );
};
