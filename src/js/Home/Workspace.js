import React from "react";

import Header from "./Header";

export default function Workspace(props) {
  return (
    <div>
      <Header id={props.id} />
      <h3>Workspace</h3>
      <h3>ID do usuário: {props.id}</h3>
    </div>
  );
}
