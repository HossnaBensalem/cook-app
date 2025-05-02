import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { user } = useAuth();
  if (!user) {
    navigate("/login");
  }
  return children;
};

export default ProtectedRoute;
