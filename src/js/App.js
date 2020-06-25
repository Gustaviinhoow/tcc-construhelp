import React, { Component, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./DashboardComponents/Dashboard";
import PrivateRoute from "./PrivateRoute";

/* import WorkspacesList from "./DashboardComponents/WorkspacesList";
import Workspace from "./DashboardComponents/Workspace";
import Schedule from "./DashboardComponents/Schedule";
import Settings from "./DashboardComponents/Settings"; */

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route
              path="/dashboard"
              exact
              render={(props) => {
                if (props.location.state === undefined) {
                  return (
                    <div>
                      <h3>Você não está logado.</h3>
                    </div>
                  );
                } else {
                  return (
                    <Dashboard
                      id={props.location.state.id}
                      match={props.match.url}
                    />
                  );
                }
              }}
              exact
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
