import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "./apollo";
import LoggedInRouter from "./routes/LoggedInRouter";
import LoggedOutRouter from "./routes/LoggedOutRouter";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return <div>{isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}</div>;
}

export default App;
