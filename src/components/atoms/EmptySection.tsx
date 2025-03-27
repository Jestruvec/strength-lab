interface EmptySectionProps {
  message?: string;
}

export const EmptySection = ({
  message = "Esta seccion se encuentra vacia",
}: EmptySectionProps) => {
  return (
    <div className="flex items-center justify-center ">
      <span className="text-xs">{message}</span>
    </div>
  );
};
