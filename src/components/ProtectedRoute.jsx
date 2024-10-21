import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve the UID from localStorage
  const userUID = localStorage.getItem("token");

  // Check if the UID exists; if not, redirect to the login page
  if (!userUID) {
    return <Navigate to="/" replace />;
  }

  // If the UID exists, render the protected route component
  return children;
};

export default ProtectedRoute;
