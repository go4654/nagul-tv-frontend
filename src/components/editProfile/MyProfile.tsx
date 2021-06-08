import gql from "graphql-tag";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useMe } from "../../hooks/useMe";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  firstName: string;
  email: string;
  password: string;
}

export const MyProfile: React.FC = () => {
  const { data: userData } = useMe();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      firstName: userData?.me.firstName,
      email: userData?.me.email,
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="w-4/6 shadow-lg  py-14 px-10">
      <h3 className="text-2xl font-semibold">My Profile</h3>

      <div className="mt-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("firstName")}
            className="input"
            type="text"
            placeholder="이름"
          />

          <input
            {...register("email")}
            className="input mt-10"
            type="email"
            placeholder="이메일"
          />

          <input
            {...register("password")}
            className="input mt-10"
            type="password"
            placeholder="패스워드"
          />

          <input
            className="input mt-10"
            type="password"
            placeholder="패스워드 확인"
          />

          <button className="text-sm py-4 mt-14 w-full rounded-md bg-indigo-600">
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};
