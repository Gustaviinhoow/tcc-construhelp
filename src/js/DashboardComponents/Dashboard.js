import React from "react";
import Header from "./Header";
import Workspaces from "./WorkspacesList";

import "../../css/Dashboard.css";

export default function Dashboard(props) {
  const { id } = props;

  // Criar rotas

  return (
    <div>
      <Header />
      <Workspaces id={id} />
    </div>
  );
}
