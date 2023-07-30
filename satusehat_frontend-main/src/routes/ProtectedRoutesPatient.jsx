import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import SkeltonUser from "../pages/user/SkeletonUser";

const ProtectedRoutesPatient = ({ roles, ...rest }) => {
  const { currentUser, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <div>Wait For A Moment</div>;
  }

  if (!currentUser) {
    // User is not signed in, redirect to the home page or login page
    // console.log(currentUser);
    return <Navigate to='/' replace />;
  }

  if (!roles.includes(currentUser.roles)) {
    return <Navigate to='/' replace />;
  }

  // User has the required role, render the nested routes
  return <SkeltonUser />;
};

export default ProtectedRoutesPatient;
