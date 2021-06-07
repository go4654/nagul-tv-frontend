interface IErrorFormProps {
  errorMessage: string;
}

export const FormError: React.FC<IErrorFormProps> = ({ errorMessage }) => {
  return <div className="text-red-600 mt-4">{errorMessage}</div>;
};
