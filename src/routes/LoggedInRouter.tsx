import { isLoggedInVar, userLoggedOut } from "../apollo";
import { CreateAccount } from "../pages/CreateAccount";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { routes } from "../routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { NotFound } from "../components/NotFound";
import { ME_QUERY, useMe } from "../hooks/useMe";
import { meQuery } from "../__generated__/meQuery";
import { EditProfile } from "../pages/EditProfile";

const clientRoute = [
  {
    path: routes.home,
    components: <Home />,
  },
  {
    path: routes.editProfile,
    components: <EditProfile />,
  },
];

const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h3 className="font-medium text-xl tracking-wide">로딩중..</h3>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" &&
          clientRoute.map((route) => (
            <Route key={route.path} path={route.path} exact>
              {route.components}
            </Route>
          ))}

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
