import React from "react";
import { Outlet, Navigate } from "react-router-dom";
function ProtectedRoute() {
  const user=JSON.parse(localStorage.getItem("user"));
  return !!user ? <Outlet /> : <Navigate to="/login" />;
  
}

export default ProtectedRoute;
