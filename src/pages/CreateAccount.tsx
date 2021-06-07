import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { userLoggedIn } from "../apollo";
import { FormButton } from "../components/FormButton";
import { FormError } from "../components/FormError";
import { Section } from "../components/Section";
import { routes } from "../routes";
import { login, loginVariables } from "../__generated__/login";

interface IFormProps {
  userName: string;
  firstName: string;
  email: string;
  password: string;
}

export const CreateAccount = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: login) => {};

  //   const [, { data: loginResult, loading }] = useMutation();

  const onSubmit = () => {};

  return (
    <Section>
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-4xl font-semibold mb-14">Create Account</h1>
        <div className="w-5/12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center flex-col"
          >
            <div className="w-full ">
              <div className="opacity-50">ID</div>
              <input
                {...register("userName", {
                  required: "아이디를 입력해주세요.",
                })}
                className="w-full bg-gray-800 border-b py-2 focus:outline-none"
                type="text"
                placeholder="아이디"
              />
            </div>
            {errors?.userName?.message && (
              <FormError errorMessage={errors.userName.message} />
            )}

            <div className="w-full ">
              <div className="opacity-50">이름</div>
              <input
                {...register("firstName", {
                  required: "이름을 입력해주세요.",
                })}
                className="w-full bg-gray-800 border-b py-2 focus:outline-none"
                type="text"
                placeholder="이름"
              />
            </div>
            {errors?.userName?.message && (
              <FormError errorMessage={errors.userName.message} />
            )}

            <div className="w-full ">
              <div className="opacity-50">email</div>
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                })}
                className="w-full bg-gray-800 border-b py-2 focus:outline-none"
                type="text"
                placeholder="이메일"
              />
            </div>
            {errors?.userName?.message && (
              <FormError errorMessage={errors.userName.message} />
            )}

            <div className="w-full mt-11">
              <div className="opacity-50">Password</div>
              <input
                {...register("password", {
                  required: "패스워드를 입력해주세요.",
                })}
                className="w-full bg-gray-800 border-b py-2 focus:outline-none"
                type="password"
                placeholder="패스워드"
              />
            </div>
            {errors?.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}

            <FormButton canClick={isValid} message={"로그인"} loding={true} />
            {/* {loginResult?.login.error && (
              <FormError errorMessage={loginResult.login.error} />
            )} */}
          </form>
        </div>
      </div>
    </Section>
  );
};
