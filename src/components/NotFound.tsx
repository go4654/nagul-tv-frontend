import { Link } from "react-router-dom";
import { routes } from "../routes";
import { Section } from "./Section";

export const NotFound = () => {
  return (
    <Section>
      <div className="w-full mt-72 flex justify-center items-center flex-col">
        <h3 className="text-4xl">페이지를 찾을수 없습니다!! 🤔</h3>
        <p className="text-lg my-4">뒤로 돌아가거나, 홈으로 가주세요 😁</p>
        <div>
          <Link
            className="underline hover:text-blue-300 transition"
            to={routes.home}
          >
            홈으로 가기 &rarr;
          </Link>
        </div>
      </div>
    </Section>
  );
};
