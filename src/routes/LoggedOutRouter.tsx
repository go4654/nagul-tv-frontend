import { routes } from "../routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { Header } from "../components/Header";
import { Login } from "../pages/Login";
import { NotFound } from "../components/NotFound";
import { CreateAccount } from "../pages/CreateAccount";
import { VideoDetail } from "../pages/VideoDetail";

const anyRoute = [
  {
    path: routes.home,
    components: <Home />,
  },
  {
    path: routes.login,
    components: <Login />,
  },
  {
    path: routes.createAccount,
    components: <CreateAccount />,
  },
  {
    path: routes.videoDetail,
    components: <VideoDetail />,
  },
];

const LoggedOutRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        {anyRoute.map((route) => (
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

export default LoggedOutRouter;
