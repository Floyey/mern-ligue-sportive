import React from "react";
import { Navigate } from "react-router-dom";
import { userInfo } from "./../utils";
export default function ProtectedRoute({ children }) {
  return userInfo ? children : <Navigate to="/login" />;
}
