import { useMutation, useQuery } from "@apollo/client";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { createAccountVariables } from "../__generated__/createAccount";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";
import { VIDEO_DETAIL_QUERY } from "../pages/VideoDetail";
import { seeComment, seeCommentVariables } from "../__generated__/seeComment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
    }
  }
`;

const SEE_COMMENT_QUERY = gql`
  query seeComment($input: SeeCommentInput!) {
    seeComment(input: $input) {
      ok
      error
      totalPages
      totalResults
      comment {
        id
        createdAt
        updatedAt
        comment
      }
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
  const { id } = useParams<IParamsProps>();

  const { register, handleSubmit, getValues } = useForm<IFormProps>({
    mode: "onChange",
  });

  const { data } = useQuery<seeComment, seeCommentVariables>(
    SEE_COMMENT_QUERY,
    {
      variables: {
        input: {
          page: 1,
        },
      },
    }
  );
  console.log(data);

  const [createCommentMutation, { loading }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    refetchQueries: [{ query: SEE_COMMENT_QUERY }],
  });

  const onSubmit = () => {
    const { comment } = getValues();
    createCommentMutation({
      variables: {
        input: {
          videoId: +id,
          comment,
        },
      },
    });
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
    </div>
  );
};
