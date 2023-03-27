import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Table } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import dateFormat from "dateformat"; //npm i dateformat

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [backendData, setBackendData] = useState([{}]);
  const [editUser, setEditUser] = useState("");

  useEffect(() => {
    if (editUser !== "")
      localStorage.setItem("editUser", JSON.stringify(editUser));
  }, [editUser]);
  useEffect(() => {
    const fetchDataFromServer = async () => {
      let response = await fetch("/users", {
        method: "GET",
        mode: "cors",
      });
      response = await response.json();
      setBackendData(response);
    };
    fetchDataFromServer();
  }, []);

  const filterUsers = (users, query) => {
    if (!users) {
      return users;
    }

    return users.filter((user) => {
      if (Object.keys(user).length === 0) {
        return false;
      }

      const userClass = user.classshortcut?.toLowerCase();
      const userName = user.fullname?.toLowerCase();
      return userName.includes(query) || userClass?.includes(query);
    });
  };

  const filteredData = filterUsers(backendData, searchTerm.toLowerCase());

  function getEdit(e) {
    setEditUser(e);
    window.location.href = "http://localhost:3000/edit";
  }

  return (
    <div className="mt-2 m-4">
      <div className="mt-4 d-flex justify-content-center">
        <SearchBar keyword={searchTerm} setKeyword={setSearchTerm} />
      </div>
      {
        <div className="m-2 mt-4">
          {filteredData?.map((data, key) => {
            console.log(data);
            return (
              <Table striped bordered responsive key={key}>
                <tbody>
                  <tr>
                    <td className="w-25">Jméno a příjmení:</td>
                    <td
                      className="w-75 text-center"
                      onClick={(e) => getEdit(data)}
                    >
                      {data.fullname} <AiOutlineEdit />
                    </td>
                  </tr>
                  <tr>
                    <td>E-mail:</td>
                    <td className="text-center">{data.login}</td>
                  </tr>
                  <tr>
                    <td>Třída:</td>
                    <td className="text-center">{data.classshortcut}</td>
                  </tr>
                  <tr>
                    <td>Školní rok termínu:</td>
                    <td className="text-center">{data.schoolyear}</td>
                  </tr>
                  <tr>
                    <td>Školní rok termínu:</td>
                    <td className="text-center">
                      {data.datefrom
                        ? dateFormat(data.datefrom, "yyyy-mm-dd")
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Školní rok termínu:</td>
                    <td className="text-center">
                      {data.dateto
                        ? dateFormat(data.dateto, "yyyy-mm-dd")
                        : null}
                    </td>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <td className="text-center d-flex justify-content-center">
                      {data.isactive === true ? "Aktivní" : "Neaktivní"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            );
          })}
        </div>
      }
    </div>
  );
};

export default Users;
