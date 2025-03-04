interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className="text-red-500 text-xs mt-1">{message}</div>;
};
