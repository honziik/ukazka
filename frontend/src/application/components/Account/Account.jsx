import React from "react";
import Logout from "../Logout/Logout"
function Account({ user }) {
  console.log(user);
  return (
    <div>
      <h1 className="d-flex justify-content-center mt-3 text-secondary">
        My account
      </h1>
      {/*podminka pro zobrazeni user importu : uzivatelska role==admin*/}
      <h4 className="d-flex justify-content-center mt-3 text-secondary">
        User: {user.login}
      </h4>
      <a
        className="d-flex justify-content-center mt-1 text-decoration-none"
        href="password"
      >
        <button className="btn btn-outline-primary">Change password</button>
      </a>
      <a
        className="d-flex justify-content-center mt-1 text-decoration-none"
        href="login"
      >
        <button className="btn btn-outline-primary" onClick={Logout}>Logout</button>
      </a>
    </div>
  );
}

export default Account;
