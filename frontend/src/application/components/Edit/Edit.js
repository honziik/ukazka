import React, { useState } from "react";
import { useEffect } from "react";
import dateFormat from "dateformat";

const Edit = ({ user }) => {
  var editid = user.authuser_id;
  var termid = user.term_id;

  const [email, setEmail] = useState(user.login);
  const [pass, setPass] = useState(user.password);
  const [title, setTitle] = useState(user.title);
  const [fname, setFname] = useState(user.firstname);
  const [lname, setLname] = useState(user.lastname);
  const [degree, setDegree] = useState(user.degree);
  const [term, setTerm] = useState(user.schoolyear);
  const [classShortcut, setClassShortcut] = useState(user.classshortcut);
  const [checked, setChecked] = useState(user.isactive);
  const [active, setActive] = useState(user.isactive);
  const [dateFrom, setDateFrom] = useState(user.datefrom);
  const [dateTo, setDateTo] = useState(user.dateto);

  useEffect(() => {
    setActive(user.isactive);
    if (checked) {
      setChecked(checked);
    } else setChecked(active);
  });
  useEffect(() => {
    if (!email) {
      setEmail(user.login);
    }
  });
  useEffect(() => {
    if (!pass) {
      setPass(user.password);
    }
  });
  useEffect(() => {
    if (!fname) {
      setFname(user.firstname);
    }
  });
  useEffect(() => {
    if (!lname) {
      setLname(user.lastname);
    }
  });
  useEffect(() => {
    if (degree || degree == "") {
      setDegree(degree);
    } else setDegree(user.degree);
  });
  useEffect(() => {
    if (title || title == "") {
      setTitle(title);
    } else setTitle(user.title);
  });
  useEffect(() => {
    if (!classShortcut) {
      setClassShortcut(user.classshortcut);
    }
  });
  useEffect(() => {
    if (!term) {
      setTerm(user.schoolyear);
    }
  });
  useEffect(() => {
    if (!dateFrom) {
      setDateFrom(
        user.datefrom ? dateFormat(user.datefrom, "yyyy-mm-dd") : null
      );
    }
  });

  useEffect(() => {
    if (!dateTo) {
      setDateTo(user.dateto ? dateFormat(user.dateto, "yyyy-mm-dd") : null);
    }
  });

  function handleEditUser(e) {
    e.preventDefault();
    console.log(dateTo);
    console.log(dateFrom);
    try {
      const body = {
        editid,
        email,
        pass,
        checked,
        title,
        fname,
        lname,
        degree,
        classShortcut,
        dateFrom,
        dateTo,
        termid,
      };

      const response = fetch("/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.href = "http://localhost:3000/users";
      alert("Done");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <>
      <h1 className="text-center mt-3 text-secondary">Edit User</h1>
      <div className="d-flex justify-content-center">
        <form>
          <label className="col-form-label-lg row">E-mail</label>
          <input
            className="form-control-lg"
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={user.login}
          />
          <label className="col-form-label-lg row">Password</label>
          <input
            className="form-control-lg"
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPass(e.target.value)}
            defaultValue={user.password}
          />

          <label className="col-form-label-lg row">Title</label>
          <input
            className="form-control-lg"
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={user.title}
          />

          <label className="col-form-label-lg row">First name</label>
          <input
            className="form-control-lg"
            type="text"
            name="firstname"
            id="firstname"
            onChange={(e) => setFname(e.target.value)}
            defaultValue={user.firstname}
          />

          <label className="col-form-label-lg row">Last name</label>
          <input
            className="form-control-lg"
            type="text"
            name="lastname"
            id="lastname"
            onChange={(e) => setLname(e.target.value)}
            defaultValue={user.lastname}
          />
          <label className="col-form-label-lg row">Degree</label>
          <input
            className="form-control-lg"
            type="text"
            name="degree"
            id="degree"
            onChange={(e) => setDegree(e.target.value)}
            defaultValue={user.degree}
          />

          <label className="col-form-label-lg row">Class</label>
          <input
            className="form-control-lg"
            type="text"
            name="class"
            id="class"
            onChange={(e) => setClassShortcut(e.target.value)}
            defaultValue={user.classshortcut}
          />

          <label className="col-form-label-lg row">Date From</label>
          <input
            className="form-control-lg"
            type="date"
            name="dateFrom"
            id="dateFrom"
            min="2030"
            step="1"
            onChange={(e) => setDateFrom(e.target.value)}
            defaultValue={
              user.datefrom ? dateFormat(user.datefrom, "yyyy-mm-dd") : null
            }
          />
          <label className="col-form-label-lg row">Date To</label>
          <input
            className="form-control-lg"
            type="date"
            name="dateTo"
            id="dateTo"
            min="2030"
            step="1"
            onChange={(e) => setDateTo(e.target.value)}
            defaultValue={
              user.dateto ? dateFormat(user.dateto, "yyyy-mm-dd") : null
            }
          />
          <h5 className="h5 mt-3">Active</h5>
          <div className="btn-group mt-1 mb-3">
            <input
              className="btn-check"
              type="radio"
              name="activeGroup"
              id="yes"
              onClick={(e) => setChecked(true)}
              defaultChecked={active}
            />
            <label className="btn btn-outline-secondary me-2" htmlFor="yes">
              YES
            </label>

            <input
              className="btn-check"
              type="radio"
              name="activeGroup"
              id="no"
              onClick={(e) => setChecked(false)}
              defaultChecked={!active}
            />
            <label className="btn btn-outline-secondary" htmlFor="no">
              NO
            </label>
          </div>
          <div className="mb-5">
            <button
              type="submit"
              className="btn btn-outline-primary mt-3 btn-lg"
              onClick={(e) => handleEditUser(e)}
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Edit;
