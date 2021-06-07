import { Link } from "react-router-dom";
import { userLoggedOut } from "../apollo";
import { useMe } from "../hooks/useMe";
import { routes } from "../routes";

export const Header = () => {
  const { data: userData } = useMe();
  console.log(userData);

  return (
    <header className="max-w-full w-full fixed  bg-gray-800 shadow-xl flex justify-center items-center">
      <div className="max-w-7xl w-full flex justify-between items-center py-5">
        <div className="w-24">
          <Link to={routes.home}>
            <img src={require("../images/logo.png").default} alt="logo" />
          </Link>
        </div>
        <div className="text-white cursor-pointer">
          {userData?.me.avatar ? (
            <div
              className="w-10 h-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${userData.me.avatar})` }}
            ></div>
          ) : (
            <div className="w-36 flex justify-between">
              <Link to={routes.login}>로그인</Link>
              <Link to={routes.createAccount}>회원가입</Link>
              <button onClick={() => userLoggedOut()}>로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
