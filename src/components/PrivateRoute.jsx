import React, { useContext } from "react";
import { ContextProvider } from "./Provider";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const {
    userAcount,
    loading,
  } = useContext(ContextProvider);

  if (loading) {
    return <Loading></Loading>;
  }

  if (userAcount) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/sign-in"}></Navigate>;
  }
};

export default PrivateRoute;
