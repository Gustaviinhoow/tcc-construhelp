import React from "react";

import Header from "./Header";

export default function Workspace(props) {
  return (
    <div>
      <Header id={props.userId} />
      <h3>Workspace</h3>
      <h3>ID do usuário: {props.userId}</h3>
      <h3>ID do workspace editado: {props.workspaceId}</h3>
    </div>
  );
}
