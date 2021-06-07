import { useQuery } from "@apollo/client";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import ReactPlayer from "react-player";
import { useLocation, useParams } from "react-router";
import { Section } from "../components/Section";
import {
  videoDetail,
  videoDetailVariables,
} from "../__generated__/videoDetail";
import { Comment } from "../components/Comment";

const VIDEO_DETAIL_QUERY = gql`
  query videoDetail($input: VideoDetailInput!) {
    videoDetail(input: $input) {
      ok
      error
      video {
        video
        videoName
        videoDesc
        comments {
          createdAt
          updatedAt
          comment
          user {
            id
            userName
            avatar
          }
        }
      }
    }
  }
`;

interface IParamsProps {
  id: string;
}

export const VideoDetail = () => {
  const params = useParams<IParamsProps>();
  console.log(params.id);

  const { data } = useQuery<videoDetail, videoDetailVariables>(
    VIDEO_DETAIL_QUERY,
    {
      variables: {
        input: {
          videoId: +params.id,
        },
      },
    }
  );

  console.log(data);

  return (
    <div className="w-full flex justify-center py-24">
      <div className="max-w-4xl w-full">
        <div className="w-full">
          <ReactPlayer
            width="100%"
            height="500px"
            url={data?.videoDetail.video?.video}
            controls={true}
          />
        </div>
        <h3 className="text-2xl font-medium py-4">
          {data?.videoDetail?.video?.videoName}
        </h3>
        <p className="text-sm opacity-70 border-b pb-8 border-gray-500">
          {data?.videoDetail?.video?.videoDesc}
        </p>

        <div className="pt-8">
          <h3 className="text-lg font-medium">댓글</h3>
          <div className="flex justify-between items-center mt-6 mb-12">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center text-3xl overflow-hidden text-gray-400 mr-5">
              <FontAwesomeIcon className="mt-3" icon={faUser} />
            </div>
            <form className="w-full">
              <input
                className="input border-gray-500 placeholder-gray-500"
                type="text"
                placeholder="댓글 추가..."
              />
            </form>
          </div>
        </div>
        <div>
          {data?.videoDetail.video?.comments?.map((comment) => (
            <Comment
              avatar={comment.user.avatar}
              userName={comment.user.userName}
              comment={comment.comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
