import { Section } from "../../components/Section";
import { FormButton } from "../../components/FormButton";
import { useForm } from "react-hook-form";
import { FormError } from "../../components/FormError";
import { useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import imageCompression from "browser-image-compression";
import { ALL_VIDEO_QUERY } from "../Home";
import { Link, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { editVideo, editVideoVariables } from "../../__generated__/editVideo";
import {
  videoDetailQuery,
  videoDetailQueryVariables,
} from "../../__generated__/videoDetailQuery";

const EDIT_VIDEO_MUTATION = gql`
  mutation editVideo($input: EditVideoInput!) {
    editVideo(input: $input) {
      ok
      error
    }
  }
`;

const VIDEO_DETAIL_QUERY = gql`
  query videoDetailQuery($input: VideoDetailInput!) {
    videoDetail(input: $input) {
      ok
      error
      video {
        video
        coverImg
        videoName
        videoDesc
      }
    }
  }
`;

interface IFormProps {
  videoId: number;
  video?: string;
  coverImg?: string | null | undefined;
  videoName?: string;
  videoDesc?: string;
}

interface IParams {
  id: string;
}

export const EditVideo = () => {
  const [previewImg, setPreviewImg] = useState();
  const [imgFile, setImgFile] = useState();
  const [bottomMsg, setButtomMsg] = useState(0);
  const params = useParams<IParams>();

  const { data: videoDetailData } = useQuery<
    videoDetailQuery,
    videoDetailQueryVariables
  >(VIDEO_DETAIL_QUERY, {
    variables: {
      input: {
        videoId: +params.id,
      },
    },
  });
  console.log(videoDetailData);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      video: videoDetailData?.videoDetail.video?.video,
      videoName: videoDetailData?.videoDetail.video?.videoName,
      videoDesc: videoDetailData?.videoDetail.video?.videoDesc,
    },
  });

  const onCompleted = (data: editVideo) => {
    const {
      editVideo: { ok },
    } = data;
    if (ok) {
      setButtomMsg(1);
      setTimeout(() => {
        setButtomMsg(0);
      }, 6000);
    }
  };

  const [editVideoMutation, { loading }] = useMutation<
    editVideo,
    editVideoVariables
  >(EDIT_VIDEO_MUTATION, {
    onCompleted,
    refetchQueries: [
      { query: ALL_VIDEO_QUERY, variables: { input: { page: 1 } } },
    ],
  });

  const onSubmit = async () => {
    const { video, videoName, videoDesc } = getValues();

    if (!loading) {
      try {
        const newCoverImg = imgFile;
        const options = {
          maxSizeMB: 3,
          maxWidthOrHeight: 300,
        };

        //@ts-ignore
        const compressedFile = await imageCompression(newCoverImg, options);
        const formBody = new FormData();
        formBody.append("file", compressedFile);

        const { url: cover } = await (
          await fetch("http://localhost:4000/avatar-uploads/", {
            method: "POST",
            body: formBody,
          })
        ).json();

        editVideoMutation({
          variables: {
            input: {
              videoId: +params.id,
              coverImg: cover,
              video,
              videoName,
              videoDesc,
            },
          },
        });
      } catch (error) {}
    }
  };

  const onChangeCoverImg = (e: any) => {
    if (e.target.files[0]) {
      setImgFile(e.target.files[0]);

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        //@ts-ignore
        setPreviewImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Section>
      <div className=" flex justify-center py-32">
        <div className="w-2/4 py-12 px-12 shadow-2xl">
          <h3 className="text-3xl font-semibold mb-6">영상 수정</h3>

          <div className="w-full bg-gray-200">
            {previewImg ? (
              <img className="w-full" src={`${previewImg}`} alt="0" />
            ) : (
              <img
                className="w-full"
                src={`${videoDetailData?.videoDetail.video?.coverImg}`}
                alt="0"
              />
            )}
          </div>
          <label
            className="py-2 px-8 inline-block mt-8 bg-indigo-600 rounded-md text-xs cursor-pointer hover:bg-indigo-800 transition"
            htmlFor="coverImg"
          >
            썸네일 이미지 수정
          </label>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <input
              {...register("coverImg")}
              id="coverImg"
              className="input hidden"
              type="file"
              accept="image/*"
              onChange={onChangeCoverImg}
            />

            {errors.coverImg?.message && (
              <FormError errorMessage={errors.coverImg?.message} />
            )}

            <input
              {...register("video")}
              className="input mt-10"
              type="text"
              placeholder="영상 주소"
            />
            {errors.video?.message && (
              <FormError errorMessage={errors.video?.message} />
            )}

            <input
              {...register("videoName")}
              className="input mt-10"
              type="text"
              placeholder="영상 제목"
            />
            {errors.videoName?.message && (
              <FormError errorMessage={errors.videoName?.message} />
            )}

            <input
              {...register("videoDesc")}
              className="input mt-10"
              type="text"
              placeholder="영상 내용"
            />
            {errors.videoDesc?.message && (
              <FormError errorMessage={errors.videoDesc?.message} />
            )}

            <FormButton
              canClick={isValid}
              message="영상 수정하기"
              loding={loading}
            />
          </form>
        </div>
      </div>

      <div
        style={{ opacity: `${bottomMsg}` }}
        className="rounded-lg py-4 w-full bg-yellow-600 flex justify-center items-center fixed bottom-0 left-0  transition duration-700"
      >
        영상이 수정 되었습니다.{" "}
        <Link to={routes.home}>메인으로 가기 &rarr;</Link>
      </div>
    </Section>
  );
};
