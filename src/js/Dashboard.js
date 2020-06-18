import React from "react";
import Header from "./Header";
import Page from "./Page";

import "../css/Dashboard.css";

export default function Dashboard(props) {
  const { id } = props;

  return (
    <div>
      {/* <Header /> */}
      <Page id={id} />
    </div>
  );
}
