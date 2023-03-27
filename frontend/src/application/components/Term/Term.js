import React from "react";
import { useState } from "react";

const TermAdd = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [name, setName] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, fromDate, toDate };
      const response = fetch("/term", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.href = "http://localhost:3000/imports";
      alert("Term " + name + " Added");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <h1 className="d-flex justify-content-center mt-3 text-secondary">
        Add new term
      </h1>
      <div className="d-flex justify-content-center mt-3 ">
        <form onSubmit={onSubmitForm}>
          <div className="form-group ">
            <label className="col-form-label-lg row">Name</label>
            <input
              className="form-control-lg"
              type="text"
              name="name"
              id="term"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group ">
            <label className="col-form-label-lg row">From</label>
            <input
              className="form-control-lg"
              type="date"
              name="fromDate"
              id="term"
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </div>

          <br />
          <div className="form-group ">
            <label className="col-form-label-lg row">To</label>
            <input
              className="form-control-lg"
              type="date"
              name="toDate"
              id="term"
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-outline-primary mt-3 btn-lg">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default TermAdd;
