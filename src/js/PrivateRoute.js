import React from "react";
import { Route, Redirect } from "react-router-dom";
import { browserHistory } from "react-router";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        props.id !== undefined ||
        props.id !== "" ||
        props.id !== 0 ||
        props.id !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}