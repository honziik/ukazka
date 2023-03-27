import React from "react";
import {Outlet,Navigate} from "react-router-dom";
function ProtectedRouteRole2() {
        const user=JSON.parse(localStorage.getItem("user"));
        return !!user && user.roles_id !== 4 ? <Outlet /> : <Navigate to="/" />;
            
}

export default ProtectedRouteRole2;