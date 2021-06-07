import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { routes } from "../routes";

export const Header = () => {
  const { data: userData } = useMe();
  console.log(userData);

  return (
    <header className="max-w-full w-full fixed  bg-gray-800 shadow-xl flex justify-center items-center z-50">
      <div className="max-w-7xl w-full flex justify-between items-center py-5">
        <div className="w-24">
          <Link to={routes.home}>
            <img src={require("../images/logo.png").default} alt="logo" />
          </Link>
        </div>
        <div className="text-white cursor-pointer">
          {userData ? (
            <Link to={routes.editProfile}>
              {userData.me.avatar ? (
                <div
                  className="w-10 h-10 rounded-full bg-gray-100 bg-center bg-cover"
                  style={{ backgroundImage: `url(${userData.me.avatar})` }}
                ></div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center text-3xl overflow-hidden text-gray-400 pt-3">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </Link>
          ) : (
            <div className="w-36 flex justify-between">
              <Link to={routes.login}>로그인</Link>
              <Link to={routes.createAccount}>회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
