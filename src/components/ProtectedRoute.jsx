import React, { Component, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from "../utils/Context";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  return (
    <Route
      path={path}
      {...rest}
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
