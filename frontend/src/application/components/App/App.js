import React, { useState, useEffect } from "react";
import NavComp from "../Navbar/NavComp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Login/Login.jsx";
import Home from "../Home/HomeExams";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Exams from "../Exams/Overview";
import Account from "../Account/Account";
import Import from "../Imports/Import";
import ProtectedRouteRole from "../ProtectedRoute/ProtectedRouteRole";
import Password from "../Password/Password";
import Logout from "../Logout/Logout";
import ExamAdd from "../Imports/NewExam/ExamAdd";
import Users from "../Users/Users";
import Edit from "../Edit/Edit";
import ProtectedRouteRole2 from "../ProtectedRoute/ProtectedRouteRole2";


function App() {
  const [user, setUser] = useState("");
  const [editStudent, setEditStudent] = useState("");
  const [edit, setEdit] = useState("");

  useEffect(() => {
    const setting = localStorage.getItem("user");
    if (setting) {
      setUser(JSON.parse(setting));
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const setting = localStorage.getItem("editUser");
    if (setting) {
      setEditStudent(JSON.parse(setting));
    }
  }, []);


  return (
    <>
    
      <Router>
        <div className="App">
          <header className="App-header">
          <NavComp data={user}/>
          </header>
          <Routes>
            <Route path="/" element={<Home user={user}/>} exact />
            <Route path="/login" element={<Login setUser={setUser} />} exact />
            <Route exact path="/exams" element={<ProtectedRoute/>}>
              <Route
                exact
                path="/exams"
                element={<Exams user={user} />}
              />
            </Route>
            <Route exact path="/account" element={<ProtectedRoute/>}>
              <Route exact path="/account" element={<Account user={user} />} />
            </Route>
            <Route exact path="/imports" element={<ProtectedRouteRole />}>
              <Route exact path="/imports" element={<Import />} />
            </Route>
            <Route exact path="/password" element={<ProtectedRoute />}>
              <Route exact path="/password" element={<Password user={user}/>} />
            </Route>
            <Route path="/logout" element={<Logout />} exact />
            <Route exact path="/examadd" element={<ProtectedRoute />}>
              <Route exact path="/examadd" element={<ExamAdd  />} />
            </Route>
            <Route exact path="/edit" element={<ProtectedRouteRole2 />}>
              <Route exact path="/edit" element={<Edit user={editStudent}/>} />
            </Route>
            <Route exact path="/users" element={<ProtectedRouteRole2/>}>
              <Route
                exact
                path="/users"
                element={<Users editUser={setEdit} />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
