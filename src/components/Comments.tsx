import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";

interface ICommentProps {
  avatar: string | null;
  userName: string;
  comment: string;
}

export const Comments: React.FC<ICommentProps> = ({
  avatar,
  userName,
  comment,
}) => {
  const { data: userData } = useMe();
  console.log(userData?.me.comments);

  return (
    <div className="flex items-center my-8">
      {avatar ? (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center text-3xl overflow-hidden text-gray-400 mr-3">
          <FontAwesomeIcon className="mt-3" icon={faUser} />
        </div>
      ) : (
        <div
          className="w-10 h-10 mr-3 bg-gray-200 rounded-full "
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
      )}
      <div>
        <div className="text-sm font-semibold">{userName}</div>
        <h3 className="text-sm font-light">{comment}</h3>
      </div>

      {/* {userData?.me.comments ? "❌" : null} */}
    </div>
  );
};
