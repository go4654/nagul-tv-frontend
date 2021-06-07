import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { routes } from "../routes";

export const Header = () => {
  return (
    <header className="max-w-full w-full fixed  bg-gray-800 shadow-xl flex justify-center items-center">
      <div className="max-w-7xl w-full flex justify-between items-center py-5">
        <div className="w-24">
          <Link to={routes.home}>
            <img src={require("../images/logo.png").default} alt="logo" />
          </Link>
        </div>
        <div className="text-white cursor-pointer">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </header>
  );
};
