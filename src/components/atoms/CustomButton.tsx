type ButtonType = "button" | "submit" | "reset";
type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "success" | "warning" | "danger" | "info";

interface CustomButtonProps {
  onClick?: () => void;
  color?: ButtonColor;
  type?: ButtonType;
  size?: ButtonSize;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
}

export const CustomButton = ({
  type = "button",
  label = "Guardar",
  color = "info",
  onClick,
  disabled,
  loading,
  size = "md",
}: CustomButtonProps) => {
  const getButtonColor = () => {
    switch (color) {
      case "success":
        return "bg-green-700";
      case "warning":
        return "bg-yellow-700";
      case "danger":
        return "bg-red-700";

      default:
        return "bg-gray-700";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white rounded-md cursor-pointer shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${
        size === "md" || size === "lg" ? "p-2" : "px-1"
      } ${getButtonColor()}`}
      disabled={disabled || loading}
    >
      <span className={`${size === "sm" ? "text-xs" : ""}`}>
        {loading ? "Loading..." : label}
      </span>
    </button>
  );
};
