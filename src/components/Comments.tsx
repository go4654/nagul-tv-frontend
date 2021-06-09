import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faUndo,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";
import { useState } from "react";
import { EditComment } from "./EditComment";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import {
  deleteComment,
  deleteCommentVariables,
} from "../__generated__/deleteComment";
import { VIDEO_DETAIL_QUERY } from "../pages/VideoDetail";
import { useParams } from "react-router";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      ok
      error
    }
  }
`;

interface ICommentProps {
  userId: number;
  avatar: string | null;
  userName: string;
  commentId: number;
  comment: string;
}

interface IParamsProps {
  id: string;
}

export const Comments: React.FC<ICommentProps> = ({
  userId,
  avatar,
  userName,
  commentId,
  comment,
}) => {
  const [seeEdit, setSeeEdit] = useState(false);
  const { data: userData } = useMe();
  const params = useParams<IParamsProps>();

  const [deleteCommentMutation, { loading }] = useMutation<
    deleteComment,
    deleteCommentVariables
  >(DELETE_COMMENT_MUTATION, {
    refetchQueries: [
      {
        query: VIDEO_DETAIL_QUERY,
        variables: { input: { videoId: +params.id } },
      },
    ],
  });

  const onClickDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      deleteCommentMutation({
        variables: {
          input: {
            commentId,
          },
        },
      });
    }
  };

  return (
    <div className="flex justify-between items-center my-12">
      <div className="flex items-center w-11/12">
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
          {seeEdit ? (
            <EditComment setSeeEdit={setSeeEdit} commentId={commentId} />
          ) : (
            <>
              <div className="text-sm font-semibold">{userName}</div>
              <h3 className="text-sm font-light">{comment}</h3>
            </>
          )}
        </div>
      </div>
      <div>
        {userData?.me.id === userId ? (
          <div className="flex">
            {seeEdit ? (
              <button
                onClick={() => setSeeEdit(false)}
                className="mr-6 focus:outline-none hover:text-red-400 transition"
              >
                <FontAwesomeIcon icon={faUndo} />
              </button>
            ) : (
              <button
                onClick={() => setSeeEdit(true)}
                className="text-yellow-400 focus:outline-none hover:text-yellow-300 transition mr-6"
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            )}

            <button
              onClick={onClickDelete}
              className="text-red-400 hover:text-red-600 transition "
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
