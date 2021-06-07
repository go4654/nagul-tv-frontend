import { useHistory } from "react-router";
import { userLoggedOut } from "../apollo";
import { PageTitle } from "../components/PageTitle";
import { Section } from "../components/Section";

export const EditProfile = () => {
  const history = useHistory();
  return (
    <Section>
      <PageTitle title={"프로필 수정"} />
      <button className="py-32" onClick={() => userLoggedOut()}>
        로그아웃
      </button>
    </Section>
  );
};
