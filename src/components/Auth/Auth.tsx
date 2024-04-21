import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";
import { Login } from "../../screens/Login";

export const Auth = ({
  children,
  isLogin,
}: {
  children: ReactElement;
  isLogin?: boolean;
}) => {
  if (isAuthenticated()) {
    return children;
  }
  if (isLogin) {
    return <Login />;
  }
  return <Navigate to="/login" />;
};
