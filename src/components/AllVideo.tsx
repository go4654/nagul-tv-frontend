import { Link } from "react-router-dom";

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
  return (
    <Link key={id} to="#">
      <div key={id} className="w-96">
        <div
          className="w-full h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImg})` }}
        ></div>
        <h3 className="text-xl font-semibold mt-5 mb-1">{videoName}</h3>
        <p className="opacity-60 font-extralight">{videoDesc}</p>
      </div>
    </Link>
  );
};
