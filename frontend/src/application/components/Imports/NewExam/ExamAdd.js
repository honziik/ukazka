import React, { useEffect, useState } from "react";
import Select from "react-select";

function ExamAdd() {
  const [backendData, setBackendData] = useState([{}]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [student, setStudent] = useState("");
  const [teacher, setTeacher] = useState("");
  const [oponent, setOponent] = useState("");
  const [discipline, setDiscipline] = useState("IT");
  useEffect(() => {
    //Init async function
    const fetchDataFromServer = async () => {
      //Then await on the data.
      //You can use .then(...) notation but for me async await is much cleaner.
      let response = await fetch("/selectUsers", {
        method: "GET",
        mode: "cors",
      });
      response = await response.json();
      setBackendData(response);
    };
    fetchDataFromServer();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let taken;
    if (student !== "") taken = true;
    else taken = false;
    if (teacher !== "" && oponent !== "") {
      let stud = student.value;
      let teac = teacher.value;
      let opon = oponent.value;
      try {
        const body = {
          title,
          description,
          discipline,
          stud,
          teac,
          opon,
          taken,
        };
        const response = fetch(`/imports/examAdd`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        window.location.href = "http://localhost:3000/imports";
        alert("Done");
      } catch (err) {
        console.log(err.message);
      }
    } else alert("Leader and Oponent are required");
  };
  let teachers = [];
  let oponents = [];
  let students = [];
  if (backendData) {
    for (let i = 0; i < backendData.length; i++) {
      if (backendData[i].roles_id === 4)
        students.push({
          value: String(backendData[i].authuser_id),
          label: String(backendData[i].login),
        });
      if (backendData[i].roles_id === 3)
        oponents.push({
          value: String(backendData[i].authuser_id),
          label: String(backendData[i].login),
        });
      if (backendData[i].roles_id === 2)
        teachers.push({
          value: String(backendData[i].authuser_id),
          label: String(backendData[i].login),
        });
    }
  }

  return (
    <>
      <h1 className="d-flex justify-content-center mt-3 text-secondary">
        Add Exam
      </h1>
      <div className="d-flex justify-content-center mt-3 ">
        <form onSubmit={handleSubmit}>
          <label className="col-form-label-lg row">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="form-control-lg"
            type="text"
            name="title"
            id="title"
            required
          />
          <label className="col-form-label-lg row">Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="form-control z-depth-1"
            id="description"
            rows="4"
            placeholder="Enter description here..."
          ></textarea>
          <label className="col-form-label-lg row">Student's e-mail</label>
          {
            <Select
              options={students}
              onChange={setStudent}
              placeholder="not required"
            />
          }

          <label className="col-form-label-lg row">Oponent's e-mail</label>
          {
            <Select
              options={oponents}
              onChange={setOponent}
              placeholder="required"
              required
            />
          }
          <div className="form-group">
            <label className="col-form-label-lg row">
              Exam Leader's e-mail
            </label>
            {
              <Select
                options={teachers}
                onChange={setTeacher}
                placeholder="required"
                className="examAddUserSelect"
                required
              />
            }
          </div>
          <h5 className="h5 mt-3">Select academic discipline</h5>
          <div className="btn-group mt-1 mb-3">
            <input
              onChange={(e) => setDiscipline(e.target.value)}
              className="btn-check"
              type="radio"
              name="userGroup"
              id="it"
              value="IT"
              defaultChecked
            />
            <label className="btn btn-outline-secondary me-2" htmlFor="it">
              Informatics
            </label>

            <input
              onChange={(e) => setDiscipline(e.target.value)}
              className="btn-check"
              type="radio"
              name="userGroup"
              id="elt"
              value="ELT"
            />
            <label className="btn btn-outline-secondary" htmlFor="elt">
              Electrotechnics
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
}

export default ExamAdd;
