import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "react-router";
import {
  videoDetail,
  videoDetailVariables,
} from "../__generated__/videoDetail";
import { Comments } from "../components/Comments";
import { Comment } from "../components/Comment";
import { Video } from "../components/Video";

export const VIDEO_DETAIL_QUERY = gql`
  query videoDetail($input: VideoDetailInput!) {
    videoDetail(input: $input) {
      ok
      error
      video {
        video
        videoName
        videoDesc
        comments {
          id
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

  return (
    <div className="w-full flex justify-center py-24">
      <div className="max-w-4xl w-full">
        <Video
          video={data?.videoDetail.video?.video}
          videoName={data?.videoDetail?.video?.videoName}
          videoDesc={data?.videoDetail?.video?.videoDesc}
        />

        <Comment />

        <div>
          {data?.videoDetail.video?.comments?.map((comment, index) => (
            <Comments
              key={index}
              userId={comment.user.id}
              avatar={comment.user.avatar}
              userName={comment.user.userName}
              commentId={comment.id}
              comment={comment.comment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
