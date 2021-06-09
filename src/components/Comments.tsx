import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";
import { Link } from "react-router-dom";
import { routes } from "../routes";

interface ICommentProps {
  userId: number;
  avatar: string | null;
  userName: string;
  commentId: number;
  comment: string;
}

export const Comments: React.FC<ICommentProps> = ({
  userId,
  avatar,
  userName,
  commentId,
  comment,
}) => {
  const { data: userData } = useMe();

  return (
    <div className="flex justify-between items-center my-12">
      <div className="flex items-center">
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
      </div>
      <div>
        {userData?.me.id === userId ? (
          <div>
            <Link
              to={`/edit-comment/${commentId}`}
              className="text-yellow-400 hover:text-yellow-300 transition mr-6"
            >
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            <button className="text-red-400 hover:text-red-600 transition ">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
