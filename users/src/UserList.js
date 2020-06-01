import React, { useState, useEffect } from "react";
import { useParams, Route, Link } from "react-router-dom";
import UserForm from "./UserForm";
import axios from "axios";
import "./App.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => {
        setUsers(res.data);
        console.log("GET request for users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
        <div className="App">
          <div className="list">
            <h1>User List</h1>

            {users.map((user, index) => (
              <div className="user" key={index}>
                <Link to={`/users/${user.id}`}>
                  <h1>{user.name}</h1>
                </Link>
              </div>
            ))}
          </div>
        </div>
    </>
  );
}

export default UserList;
