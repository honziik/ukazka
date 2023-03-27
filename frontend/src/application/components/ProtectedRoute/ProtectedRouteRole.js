import React from "react";
import {Outlet,Navigate} from "react-router-dom";
function ProtectedRoute() {
        const user=JSON.parse(localStorage.getItem("user"));
        return !!user && user.roles_id === 1 ? <Outlet /> : <Navigate to="/" />;
            
}

export default ProtectedRoute
