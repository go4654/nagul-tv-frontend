import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { userLoggedIn } from "../apollo";
import { FormButton } from "../components/FormButton";
import { FormError } from "../components/FormError";
import { PageTitle } from "../components/PageTitle";
import { Section } from "../components/Section";
import { routes } from "../routes";
import { login, loginVariables } from "../__generated__/login";

const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

interface IFormProps {
  userName: string;
  password: string;
}

interface ILocationProps {
  message: string;
}

export const Login = () => {
  const history = useHistory();
  const location = useLocation<ILocationProps>();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: login) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      userLoggedIn(token);
      history.replace(routes.home);
      window.location.reload();
    }
  };

  const [loginMutation, { data: loginResult, loading }] = useMutation<
    login,
    loginVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    const { userName, password } = getValues();
    if (!loading) {
      loginMutation({
        variables: {
          input: {
            userName,
            password,
          },
        },
      });
    }
  };

  return (
    <Section>
      <PageTitle title={"로그인"} />
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-4xl font-semibold mb-14">Log in</h1>
        <div className="w-5/12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center flex-col"
          >
            <div className="text-green-500 font-semibold mb-8">
              {location?.state?.message}
            </div>

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

            <FormButton
              canClick={isValid}
              message={"로그인"}
              loding={loading}
            />
            {loginResult?.login.error && (
              <FormError errorMessage={loginResult.login.error} />
            )}
          </form>
        </div>
      </div>
    </Section>
  );
};
