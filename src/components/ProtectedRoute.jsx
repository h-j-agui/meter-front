import React, { Component, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from "../utils/Context";

const PrivateRoute = ({ component: Component, path }) => {
  const loggedIn = useContext(LoginContext);
  return (
    <Route
      path={path}
      render={(props) => {
        return loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/admin",
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
