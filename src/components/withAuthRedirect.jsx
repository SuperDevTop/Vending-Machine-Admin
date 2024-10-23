import React from "react";
import { Navigate } from "react-router-dom";

const withAuthRedirect = (WrappedComponent) => {
  return (props) => {
    const token = localStorage.getItem("token");

    if (token) {
      return <Navigate to="/dashboard/operator-list" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;
