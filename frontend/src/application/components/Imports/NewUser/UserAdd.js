import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
const UserAdd = () => {
  const [backendData, setBackendData] = useState([{}]);
  useEffect(() => {
    //Init async function
    const fetchDataFromServer = async () => {
      //Then await on the data.
      //You can use .then(...) notation but for me async await is much cleaner.
      let response = await fetch("/selectYear", {
        method: "GET",
        mode: "cors",
      });
      response = await response.json();
      setBackendData(response);
    };
    fetchDataFromServer();
  }, []);
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastame] = useState("");
  const [degree, setDegree] = useState("");
  const [number, setNumber] = useState("");
  const [sclass, setSClass] = useState([]);
  const [sy, setSY] = useState([]);
  let classes = [
    { value: 1, label: "I4A" },
    { value: 2, label: "I4B" },
    { value: 3, label: "I4C" },
    { value: 4, label: "E4A" },
    { value: 5, label: "E4B" },
  ];
  let years = [];
  if (backendData) {
    for (let i = 0; i < backendData.length; i++) {
      years.push({
        value: String(backendData[i].id),
        label:
          String(backendData[i].datefrom).substr(0, 10) +
          " to " +
          String(backendData[i].dateto).substr(0, 10), //zeptat se
      });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === "student") {
      //kontrola jestli email uz existuje
      if (degree === "") {
        if (title === "") {
          let trida = sclass.value;
          let rok = sy.value;
          console.log({
            email,
            password,
            firstname,
            lastname,
            number,
            trida,
            rok,
          });
          try {
            const body = {
              email,
              password,
              firstname,
              lastname,
              number,
              trida,
              rok,
            };
            const response = fetch(`/imports/studentAdd`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
            window.location.href = "http://localhost:3000/imports";
            alert("Done");
          } catch (err) {
            console.log(err.message);
          }
        } else alert("Student nemůže mít titul");
      } else alert("Student nemůže mít titul");
    } else {
      if (sy === "" || sclass.label === undefined) {
        try {
          const body = {
            email,
            password,
            firstname,
            lastname,
            number,
            degree,
            title,
          };
          const response = fetch(`/imports/teacherAdd`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          window.location.href = "http://localhost:3000/imports";
          alert("Done");
        } catch (err) {
          console.log(err.message);
        }
      } else alert("Učitel nepatří do třídy a nemůže mít školní rok");
    }
  };
  return (
    <>
      <h1 className="d-flex justify-content-center mt-3 text-secondary">
        Add User
      </h1>
      <div className="d-flex justify-content-center mt-3 ">
        <form onSubmit={handleSubmit}>
          <label className="col-form-label-lg row">E-mail</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-control-lg"
            type="email"
            name="email"
            id="email"
            required
          />
          <label className="col-form-label-lg row">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-control-lg"
            type="password"
            name="password"
            id="password"
            required
          />
          <label className="col-form-label-lg row">Class</label>
          {
            <Select
              options={classes}
              onChange={setSClass}
              placeholder="for student"
              className="examAddUserSelect"
            />
          }
          <label className="col-form-label-lg row">School Year</label>
          {
            <Select
              options={years}
              onChange={setSY}
              placeholder="for student"
            />
          }
          <label className="col-form-label-lg row">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="form-control-lg"
            type="text"
            name="title"
            id="title"
          />
          <label className="col-form-label-lg row">First name</label>
          <input
            onChange={(e) => setFirstname(e.target.value)}
            className="form-control-lg"
            type="text"
            name="firstname"
            id="firstname"
            required
          />

          <label className="col-form-label-lg row">Last name</label>
          <input
            onChange={(e) => setLastame(e.target.value)}
            className="form-control-lg"
            type="text"
            name="lastname"
            id="lastname"
            required
          />
          <label className="col-form-label-lg row">Degree</label>
          <input
            onChange={(e) => setDegree(e.target.value)}
            className="form-control-lg"
            type="text"
            name="degree"
            id="degree"
          />
          <label className="col-form-label-lg row">National number</label>
          <input
            onChange={(e) => setNumber(e.target.value)}
            className="form-control-lg"
            type="text"
            name="nNumber"
            id="nNumber"
          />
          <h5 className="h5 mt-3">Select user's role</h5>
          <div className="btn-group mt-1 mb-3">
            <input
              onChange={(e) => setRole(e.target.value)}
              className="btn-check"
              type="radio"
              name="userGroup"
              id="student"
              value="student"
              defaultChecked
            />
            <label className="btn btn-outline-secondary me-2" htmlFor="student">
              Student
            </label>

            <input
              onChange={(e) => setRole(e.target.value)}
              className="btn-check"
              type="radio"
              name="userGroup"
              id="teacher"
              value="teacher"
            />
            <label className="btn btn-outline-secondary" htmlFor="teacher">
              Teacher
            </label>
          </div>
          <div className="mb-5">
            <button
              type="submit"
              className="btn btn-outline-primary mt-3 btn-lg"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserAdd;
