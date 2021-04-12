import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { routesConstans } from "./routesConstans";

export function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component {...props} />;
        } else {
          return <Redirect to={routesConstans.login.path} />;
        }
      }}
    />
  );
}

export function NotLoggedRoute({ component: Component, ...rest }) {
  const { isAuth } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}
