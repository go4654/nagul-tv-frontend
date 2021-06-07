import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FormButton } from "../components/FormButton";
import { FormError } from "../components/FormError";
import { Section } from "../components/Section";
import { routes } from "../routes";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  userName: string;
  firstName: string;
  email: string;
  password: string;
  re_password: string;
}

export const CreateAccount = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    watch,

    formState: { isValid, errors },
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onCompleted = (data: createAccount) => {
    const {
      createAccount: { ok },
    } = data;

    if (ok) {
      history.push(routes.login, {
        message: "회원가입 되었습니다! 로그인 해주세요.",
      });
    }
  };

  const [createAccountMutation, { data: creaetAccountResult, loading }] =
    useMutation<createAccount, createAccountVariables>(
      CREATE_ACCOUNT_MUTATION,
      {
        onCompleted,
      }
    );

  const onSubmit = () => {
    const { userName, firstName, email, password } = getValues();
    createAccountMutation({
      variables: {
        input: {
          userName,
          firstName,
          email,
          password,
        },
      },
    });
  };

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

            <div className="w-full mt-11">
              <div className="opacity-50">name</div>
              <input
                {...register("firstName", {
                  required: "이름을 입력해주세요.",
                })}
                className="w-full bg-gray-800 border-b py-2 focus:outline-none"
                type="text"
                placeholder="이름"
              />
            </div>
            {errors?.firstName?.message && (
              <FormError errorMessage={errors.firstName.message} />
            )}

            <div className="w-full mt-11">
              <div className="opacity-50">email</div>
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                className="w-full bg-gray-800 border-b py-2 focus:outline-none"
                type="email"
                placeholder="이메일"
              />
            </div>
            {errors?.email?.message && (
              <FormError errorMessage={errors.email.message} />
            )}

            <div className="w-full mt-11">
              <div className="opacity-50">Password</div>
              <input
                {...register("password", {
                  required: "패스워드를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "8자리 이상 작성해주세요",
                  },
                })}
                className="w-full bg-gray-800 border-b py-2 focus:outline-none"
                type="password"
                placeholder="패스워드"
              />
            </div>
            {errors?.password?.message && (
              <FormError errorMessage={errors.password.message} />
            )}

            <div className="w-full mt-11">
              <div className="opacity-50">Password again</div>
              <input
                {...register("re_password", {
                  required: "패스워드를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "8자리 이상 작성해주세요",
                  },
                  validate: (value) =>
                    value === password.current || "패스워드가 같지 않습니다.",
                })}
                className="w-full bg-gray-800 border-b py-2 focus:outline-none"
                type="password"
                placeholder="패스워드 확인"
              />
            </div>
            {errors?.re_password?.message && (
              <FormError errorMessage={errors.re_password.message} />
            )}

            <FormButton
              canClick={isValid}
              message={"회원가입"}
              loding={loading}
            />
            {creaetAccountResult?.createAccount.error && (
              <FormError
                errorMessage={creaetAccountResult?.createAccount.error}
              />
            )}
          </form>
        </div>
      </div>
    </Section>
  );
};
