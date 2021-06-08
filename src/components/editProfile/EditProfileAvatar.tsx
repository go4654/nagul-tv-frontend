import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userLoggedOut } from "../../apollo";

interface IEditProfileAvatarProps {
  avatar: string | null | undefined;
  userName: string | undefined;
  firstName: string | undefined;
}

export const EditProfileAvatar: React.FC<IEditProfileAvatarProps> = ({
  avatar,
  userName,
  firstName,
}) => {
  return (
    <div className="w-96 shadow-lg flex flex-col items-center py-14 px-14">
      {avatar ? (
        <div
          className="w-40 h-40 rounded-full bg-gray-100 bg-center bg-cover"
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center text-3xl overflow-hidden text-gray-400 pt-3">
          <FontAwesomeIcon icon={faUser} />
        </div>
      )}

      <h3 className="font-semibold text-xl mt-8">{userName}</h3>
      <p className="font-light opacity-60">{firstName}</p>

      <div className="w-full">
        <form>
          <input
            className="hidden w-full"
            id="avatar"
            type="file"
            accept="image/*"
          />
          <label
            htmlFor="avatar"
            className="text-sm py-4 block w-full mt-6 text-center cursor-pointer rounded-md bg-indigo-600"
          >
            프로필 사진 수정
          </label>
        </form>
      </div>

      <button
        className="text-sm py-4 w-full mt-4 rounded-md bg-indigo-600"
        onClick={() => userLoggedOut()}
      >
        로그아웃
      </button>
    </div>
  );
};
