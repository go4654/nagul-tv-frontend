import ClipLoader from "react-spinners/ClipLoader";

interface IFromButtonProps {
  canClick: boolean;
  message: string;
  loding: boolean;
}

export const FormButton: React.FC<IFromButtonProps> = ({
  canClick,
  message,
  loding,
}) => {
  return (
    <button
      className={`form_btn ${
        !canClick
          ? "bg-indigo-200 cursor-default"
          : "bg-indigo-600 cursor-pointer"
      }`}
    >
      {loding ? (
        <ClipLoader loading={loding} size="20" color="salmon" />
      ) : (
        message
      )}
    </button>
  );
};
