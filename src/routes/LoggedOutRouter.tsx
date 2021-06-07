import { isLoggedInVar } from "../apollo";
import { routes } from "../routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "../pages/Home";
import { Header } from "../components/Header";

const anyRoute = [
  {
    path: routes.home,
    components: <Home />,
  },
];

const LoggedOutRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        {anyRoute.map((route) => (
          <Route key={route.path} path={routes.home} exact>
            {route.components}
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
