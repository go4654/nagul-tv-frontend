import { useHistory } from "react-router";
import { userLoggedOut } from "../apollo";
import { Section } from "../components/Section";
import { routes } from "../routes";

export const EditProfile = () => {
  const history = useHistory();
  return (
    <Section>
      <button className="py-32" onClick={() => userLoggedOut()}>
        로그아웃
      </button>
    </Section>
  );
};
