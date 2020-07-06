import React, { useState, useEffect } from "react";
import { useParams, Route, Link } from "react-router-dom";
import UserForm from "./UserForm";
import axios from "axios";
import "./App.css";

const UserList = ({ users }) => {

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
