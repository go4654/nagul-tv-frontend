import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import {
  deleteVideo,
  deleteVideoVariables,
} from "../__generated__/deleteVideo";
import ClipLoader from "react-spinners/ClipLoader";
import { ALL_VIDEO_QUERY } from "../pages/Home";
import { useState } from "react";

const DELETE_VIDEO_MUTATION = gql`
  mutation deleteVideo($input: DeleteVideoInput!) {
    deleteVideo(input: $input) {
      ok
      error
    }
  }
`;

interface IAllVideoProps {
  id: number;
  coverImg: string | null;
  videoName: string;
  videoDesc: string;
}

export const AllVideo: React.FC<IAllVideoProps> = ({
  id,
  coverImg,
  videoName,
  videoDesc,
}) => {
  const { data: userData } = useMe();
  const [bottomMsg, setButtomMsg] = useState(0);
  console.log(bottomMsg);
  const onCompleted = (data: deleteVideo) => {
    const {
      deleteVideo: { ok },
    } = data;
    console.log(data);

    if (ok) {
      setButtomMsg(1);
      setInterval(() => {
        setButtomMsg(0);
      }, 5000);
    }
  };

  const [deleteVideoMutation, { loading }] = useMutation<
    deleteVideo,
    deleteVideoVariables
  >(DELETE_VIDEO_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: ALL_VIDEO_QUERY,
        variables: {
          input: { page: 1 },
        },
      },
    ],
  });

  const onClickDelete = () => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      deleteVideoMutation({
        variables: {
          input: {
            videoId: id,
          },
        },
      });
    }
  };

  return (
    <div key={id} className="w-96">
      <Link key={id} to={`/video-detail/${id}`}>
        <div
          className="w-full h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImg})` }}
        ></div>
        <h3 className="text-xl font-semibold mt-5 mb-1">{videoName}</h3>
        <p className="opacity-60 font-extralight">{videoDesc}</p>
      </Link>
      {userData?.me.role === "Owner" && (
        <div
          onClick={onClickDelete}
          className="py-2 w-16 text-center mt-4 rounded-md text-sm bg-red-500 cursor-pointer"
        >
          {loading ? (
            <ClipLoader size={20} loading={loading} color="salmon" />
          ) : (
            "삭제"
          )}
        </div>
      )}

      <div
        style={{ opacity: `${bottomMsg}` }}
        className="rounded-lg py-4 w-full bg-red-500 flex justify-center items-center fixed bottom-0 left-0  transition duration-700"
      >
        삭제되었습니다.
      </div>
    </div>
  );
};
