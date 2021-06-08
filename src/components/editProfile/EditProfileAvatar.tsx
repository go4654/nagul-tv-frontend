import { useMutation } from "@apollo/client";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userLoggedOut } from "../../apollo";
import {
  editProfileAvatar,
  editProfileAvatarVariables,
} from "../../__generated__/editProfileAvatar";
import imageCompression from "browser-image-compression";
import { ME_QUERY } from "../../hooks/useMe";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileAvatar($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IEditProfileAvatarProps {
  avatar: string | null | undefined;
  userName: string | undefined;
  firstName: string | undefined;
}

interface IFormProps {
  avatar: string;
}

interface IPrevewProps {
  avatar: string;
}

interface IAvatarProps {
  file: FileList;
}

export const EditProfileAvatar: React.FC<IEditProfileAvatarProps> = ({
  avatar,
  userName,
  firstName,
}) => {
  const [previewAvatar, setPreviewAvatar] = useState<IPrevewProps>();
  const [avatarFile, setAvatarFile] = useState<IAvatarProps>();
  const [bottomMsg, setButtomMsg] = useState(0);

  const { register, handleSubmit, getValues } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: editProfileAvatar) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok) {
      setButtomMsg(1);
      setInterval(() => {
        setButtomMsg(0);
      }, 2000);
    }
  };

  const [editProfileAvatarMutation, { loading }] = useMutation<
    editProfileAvatar,
    editProfileAvatarVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }],
  });

  const onSubmit = async () => {
    if (!loading) {
      try {
        const newAvatar = avatarFile;
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 300,
        };
        //@ts-ignore
        const compressedFile = await imageCompression(newAvatar, options);
        const formBody = new FormData();
        formBody.append("file", compressedFile);

        const { url: avatarImg } = await (
          await fetch("http://localhost:4000/avatar-uploads/", {
            method: "POST",
            body: formBody,
          })
        ).json();

        editProfileAvatarMutation({
          variables: {
            input: {
              avatar: avatarImg,
            },
          },
        });
      } catch (error) {}
    }
  };

  const onChangeAvatar = (e: any) => {
    if (e.target.files[0]) {
      setPreviewAvatar(e.target.files[0]);
      setAvatarFile(e.target.files[0]);

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        //@ts-ignore
        setPreviewAvatar(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="w-96 shadow-lg flex flex-col items-center py-14 px-14">
      {avatar ? (
        <label
          htmlFor="avatarImg"
          className="w-40 h-40 cursor-pointer rounded-full bg-gray-100 bg-center bg-cover"
          style={{
            backgroundImage: `url(${previewAvatar ? previewAvatar : avatar})`,
          }}
        ></label>
      ) : (
        <label
          htmlFor="avatarImg"
          className="w-10 h-10 cursor-pointer rounded-full bg-gray-100 flex justify-center items-center text-3xl overflow-hidden text-gray-400 pt-3"
        >
          <FontAwesomeIcon icon={faUser} />
        </label>
      )}

      <h3 className="font-semibold text-xl mt-8">{userName}</h3>
      <p className="font-light opacity-60">{firstName}</p>

      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("avatar")}
            className="hidden w-full"
            id="avatarImg"
            type="file"
            accept="image/*"
            onChange={onChangeAvatar}
          />
          <button
            className={`text-sm py-4 block w-full mt-6 text-center cursor-pointer rounded-md focus:outline-none ${
              previewAvatar
                ? "bg-indigo-600 cursor-pointer"
                : "bg-indigo-400 opacity-40 cursor-default"
            }`}
          >
            {loading ? "로딩중.." : "프로필 사진 수정"}
          </button>
        </form>
      </div>

      <button
        className="text-sm py-4 w-full mt-4 rounded-md bg-indigo-600"
        onClick={() => userLoggedOut()}
      >
        로그아웃
      </button>

      <div
        style={{ opacity: `${bottomMsg}` }}
        className="rounded-lg py-4 w-full bg-indigo-600 flex justify-center items-center fixed bottom-0 left-0  transition duration-700"
      >
        수정되었습니다.
      </div>
    </div>
  );
};
