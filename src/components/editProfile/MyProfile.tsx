import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMe } from "../../hooks/useMe";
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";
import { FormButton } from "../FormButton";
import { FormError } from "../FormError";
import { ME_QUERY } from "../../hooks/useMe";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  userId: number;
  firstName: string;
  email: string;
  password: string;
  re_password: string;
}

export const MyProfile: React.FC = () => {
  const [bottomMsg, setButtomMsg] = useState(0);
  const { data: userData } = useMe();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { isValid, errors },
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      firstName: userData?.me.firstName,
      email: userData?.me.email,
    },
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;

    if (ok && userData?.me) {
      setButtomMsg(1);
      setInterval(() => {
        setButtomMsg(0);
      }, 2000);
    }
  };

  const [editProfileMutation, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: ME_QUERY }],
  });

  const onSubmit = () => {
    const { firstName, email, password } = getValues();

    editProfileMutation({
      variables: {
        input: {
          firstName,
          email,
          password,
        },
      },
    });
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
            {...register("password", {
              minLength: {
                value: 8,
                message: "8자리 이상 작성해주세요.",
              },
            })}
            className="input mt-10"
            type="password"
            placeholder="패스워드"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password.message} />
          )}

          <input
            {...register("re_password", {
              minLength: {
                value: 8,
                message: "8자리 이상 작성해주세요.",
              },
              validate: (value) =>
                value === password.current || "패스워드가 같지않습니다.",
            })}
            className="input mt-10"
            type="password"
            placeholder="패스워드 확인"
          />
          {errors.re_password?.message && (
            <FormError errorMessage={errors.re_password.message} />
          )}

          <FormButton canClick={isValid} message="수정하기" loding={loading} />
        </form>
      </div>

      <div
        style={{ opacity: `${bottomMsg}` }}
        className="rounded-lg py-4 w-full bg-indigo-600 flex justify-center items-center fixed bottom-0 left-0  transition duration-700"
      >
        수정되었습니다.
      </div>
    </div>
  );
};
