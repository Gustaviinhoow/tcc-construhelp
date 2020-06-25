import React from "react";
import { Route, Switch } from "react-router-dom";

import WorkspacesList from "./WorkspacesList";
import Workspace from "./Workspace";
import Schedule from "./Schedule";
import Settings from "./Settings";

import "../../css/Dashboard.css";

export default function Dashboard(props) {
  const { id } = props;

  return (
    <div>
      <WorkspacesList id={id} />
      <Route
        path={`${props.match}/workspaces`}
        exact
        component={<WorkspacesList id={id} />}
      />
      <Route
        path={`${props.match}/workspaces/:id`}
        exact
        component={<Workspace id={id} />}
      />
      <Route
        path={`${props.match}/schedule`}
        exact
        component={<Schedule id={id} />}
      />
      <Route
        path={`${props.match}/settings`}
        exact
        component={<Settings id={id} />}
      />
      <Route path={`${props.match}/test`} component={() => <h1>test123</h1>} />
    </div>
  );
}
