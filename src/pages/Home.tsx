import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { AllVideo } from "../components/AllVideo";
import { PageTitle } from "../components/PageTitle";
import { Section } from "../components/Section";
import { allVideo, allVideoVariables } from "../__generated__/allVideo";

const ALL_VIDEO_QUERY = gql`
  query allVideo($input: AllVideoInput!) {
    allVideo(input: $input) {
      ok
      error
      totalPages
      totalResults
      videos {
        id
        video
        coverImg
        videoName
        videoDesc
      }
    }
  }
`;

export const Home = () => {
  const [page, setPage] = useState(1);

  const { data } = useQuery<allVideo, allVideoVariables>(ALL_VIDEO_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  console.log(data);

  return (
    <Section>
      <PageTitle title="홈" />

      <div className="py-40 flex justify-center flex-col items-center">
        <h3 className="text-7xl">나굴 TV 맘껏 보세요!👍</h3>

        <div className="mt-32 grid grid-cols-3 gap-x-10">
          {data?.allVideo.videos?.map((video) => (
            <AllVideo
              key={video.id}
              id={video.id}
              coverImg={video.coverImg}
              videoName={video.videoName}
              videoDesc={video.videoDesc}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-28">
          {page > 1 ? (
            <button className="text-xl" onClick={onPrevPageClick}>
              &larr; 이전
            </button>
          ) : (
            <div></div>
          )}

          <span className="text-lg opacity-50">
            {page} of {data?.allVideo.totalPages}
          </span>

          {page !== data?.allVideo?.totalPages ? (
            <button className="text-xl" onClick={onNextPageClick}>
              다음 &rarr;
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Section>
  );
};
