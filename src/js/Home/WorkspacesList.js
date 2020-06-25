import React from "react";

import Header from "./Header";

export default function WorkspacesList(props) {
  return (
    <div>
      <Header id={props.id} />
      <h3>Workspaces List</h3>
    </div>
  );
}
