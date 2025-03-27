interface ComponentProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

export const CustomChip = ({ isSelected, onClick, text }: ComponentProps) => {
  return (
    <div
      className={`${
        isSelected && "bg-gray-300"
      } border border-gray-400 cursor-pointer hover:bg-gray-200 rounded-md flex-1 overflow-hidden h-10`}
      onClick={onClick}
    >
      <span className="text-xs">{text}</span>
    </div>
  );
};
