import React, { useState, useEffect } from "react";

const Login = ({ setUser }) => {
  const [backendData, setBackendData] = useState();
  useEffect(() => {
    const fetchDataFromServer = async () => {

      let response = await fetch("/login", {
        method: "GET",
        mode: "no-cors",
      });
      response = await response.json();
      setBackendData(response);
    };
    fetchDataFromServer();
  }, []);

  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      details.email === "admin" ||
      details.email.includes("@spseiostrava.cz")
    ) {
      for (let i = 0; i < backendData.length; i++) {
        if (
          backendData[i].login === details.email &&
          backendData[i].password === details.password
        ) {
          setUser(backendData[i]);
          if (backendData[i].role === 1) {
            window.location.href = "http://localhost:3000/imports";
            break;
          } else {
            window.location.href = "http://localhost:3000/exams";
            break;
          }
        } else if (i === backendData.length - 1) {
          alert("E-mail a heslo se neshodují.");
        }
      }
    } else {
      alert("Je potřeba se přihlásit školním E-mailem.");
    }
  };
  return (
    <>
      <h1 className="d-flex justify-content-center mt-3 text-secondary">
        Login
      </h1>
      <div className="d-flex justify-content-center mt-3 ">
        <form onSubmit={submitHandler}>
          <div className="form-group ">
            <label className="col-form-label-lg row">E-mail</label>
            <input
              className="form-control-lg"
              type="text"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
              required
            />
          </div>
          <div className="form-group ">
            <label className="col-form-label-lg row">Password</label>
            <input
              className="form-control-lg"
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              required
            />
          </div>
          <button type="submit" className="btn btn-outline-primary mt-3 btn-lg">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
