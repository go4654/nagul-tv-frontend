import { useMutation } from "@apollo/client";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";
import { VIDEO_DETAIL_QUERY } from "../pages/VideoDetail";
import { useMe } from "../hooks/useMe";
import { useState } from "react";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  comment: string;
}

interface IParamsProps {
  id: string;
}

export const Comment: React.FC = () => {
  const [bottomMsg, setButtomMsg] = useState(0);
  const { data: userData } = useMe();
  const { id } = useParams<IParamsProps>();

  const { register, handleSubmit, getValues, setValue } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: createComment) => {
    const {
      createComment: { ok, error },
    } = data;

    if (ok && userData?.me) {
      setValue("comment", "");
      setButtomMsg(1);
      setInterval(() => {
        setButtomMsg(0);
      }, 2000);
    }
  };

  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: VIDEO_DETAIL_QUERY,
        variables: {
          input: {
            videoId: +id,
          },
        },
      },
    ],
  });

  const onSubmit = () => {
    const { comment } = getValues();

    if (userData?.me === undefined) {
      alert("로그인 해주세요!");
    }

    if (userData?.me) {
      createCommentMutation({
        variables: {
          input: {
            videoId: +id,
            comment,
          },
        },
      });
    }
  };

  return (
    <div className="pt-8">
      <h3 className="text-lg font-medium">댓글</h3>
      <div className="flex justify-between items-center mt-6 mb-12">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center text-3xl overflow-hidden text-gray-400 mr-5">
          <FontAwesomeIcon className="mt-3" icon={faUser} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <input
            {...register("comment", {
              required: true,
            })}
            className="input border-gray-500 placeholder-gray-500"
            type="text"
            placeholder="댓글 추가..."
          />
          <button className="hidden"></button>
        </form>
      </div>

      <div
        style={{ opacity: `${bottomMsg}` }}
        className="rounded-lg py-4 px-32 bg-indigo-600 flex justify-center items-center fixed bottom-0 left-0  transition duration-700"
      >
        댓글이 등록되었습니다!
      </div>
    </div>
  );
};
