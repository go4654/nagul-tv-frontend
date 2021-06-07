import ReactPlayer from "react-player";

interface IVideoProps {
  video: string | undefined;
  videoName: string | undefined;
  videoDesc: string | undefined;
}

export const Video: React.FC<IVideoProps> = ({
  video,
  videoName,
  videoDesc,
}) => {
  return (
    <>
      <div className="w-full">
        <ReactPlayer width="100%" height="500px" url={video} controls={true} />
      </div>
      <h3 className="text-2xl font-medium py-4">{videoName}</h3>
      <p className="text-sm opacity-70 border-b pb-8 border-gray-500">
        {videoDesc}
      </p>
    </>
  );
};
