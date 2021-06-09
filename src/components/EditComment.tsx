import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { VIDEO_DETAIL_QUERY } from "../pages/VideoDetail";
import {
  editComment,
  editCommentVariables,
} from "../__generated__/editComment";
import ClipLoader from "react-spinners/ClipLoader";

const EDIT_COMMNET_MUTATION = gql`
  mutation editComment($input: EditCommentInput!) {
    editComment(input: $input) {
      ok
      error
    }
  }
`;

interface IEditCommentProps {
  commentId: number;
  setSeeEdit: any;
}

interface IFormProps {
  comment: string;
}

interface IParamsProps {
  id: string;
}

export const EditComment: React.FC<IEditCommentProps> = ({
  commentId,
  setSeeEdit,
}) => {
  const params = useParams<IParamsProps>();

  const { register, handleSubmit, getValues } = useForm<IFormProps>();

  const onCompleted = () => {
    setSeeEdit(false);
  };

  const [editCommentMutation, { loading }] = useMutation<
    editComment,
    editCommentVariables
  >(EDIT_COMMNET_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: VIDEO_DETAIL_QUERY,
        variables: { input: { videoId: +params.id } },
      },
    ],
  });

  const onSubmit = () => {
    const { comment } = getValues();
    if (!loading) {
      editCommentMutation({
        variables: {
          input: {
            id: commentId,
            comment,
          },
        },
      });
    }
  };

  return (
    <div className="w-full pr-40">
      <form onSubmit={handleSubmit(onSubmit)} className="flex relative">
        <input
          {...register("comment")}
          className="pr-96 border-gray-600 input"
          placeholder="수정할 내용.."
        />

        <button className="text-sm bg-gray-600 py-2 px-8 rounded-md absolute -right-36">
          {loading ? (
            <ClipLoader color="salmon" size="5" loading={loading} />
          ) : (
            "댓글 수정"
          )}
        </button>
      </form>
    </div>
  );
};
