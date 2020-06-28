import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import WorkspacesList from "./Home/WorkspacesList";
import Workspace from "./Home/Workspace";
import Schedule from "./Home/Schedule";
import Settings from "./Home/Settings";

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
                  return <WorkspacesList id={props.location.state.id} />;
                }
              }}
            />
            <Route
              path={`/dashboard/workspaces`}
              exact
              component={(props) => (
                <WorkspacesList id={props.location.state.id} />
              )}
            />

            <Route
              path={`/dashboard/workspace/`}
              exact
              component={(props) => (
                <Workspace
                  userId={props.location.state.userId}
                  workspaceId={props.location.state.workspaceId}
                />
              )}
            />

            <Route
              path={`/dashboard/schedule`}
              exact
              component={(props) => <Schedule id={props.location.state.id} />}
            />
            <Route
              path={`/dashboard/settings`}
              exact
              component={(props) => <Settings id={props.location.state.id} />}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
