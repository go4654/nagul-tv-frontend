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
      {loding ? "로딩중.." : message}
    </button>
  );
};
