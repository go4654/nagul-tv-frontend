import { isLoggedInVar, userLoggedOut } from "../apollo";

const LoggedInRouter = () => {
  return (
    <div>
      <h3>로그인 되었습니다</h3>
      <button onClick={() => userLoggedOut()}>로그아웃</button>
    </div>
  );
};

export default LoggedInRouter;
