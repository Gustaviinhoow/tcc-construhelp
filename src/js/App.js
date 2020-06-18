import React from "react";
import { Router, Route, browserHistory } from "react-router";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router history={browserHistory}>
        <Route path={"/"} component={SignIn} />
        <Route path={"/signin"} component={SignIn} />
        <Route path={"/signup"} component={SignUp} />
        <PrivateRoute
          path={"/dashboard"}
          component={(props) => {
            if (props.location.state === undefined) {
              return (
                <div>
                  <h3>Você não está logado.</h3>
                </div>
              );
            } else {
              return <Dashboard id={props.location.state.id} />;
            }
          }}
          exact
        />
      </Router>
    </div>
  );
}

export default App;
