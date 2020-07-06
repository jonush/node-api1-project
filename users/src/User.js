import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserForm from "./UserForm";
import axios from "axios";
import "./App.css";

const User = ({ fetchUsers }) => {
  const [edit, setEdit] = useState([]);
  const [editing, setEditing] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios
      .get(`http://localhost:3000/api/users/${id}`)
      .then((res) => {
        setEdit(res.data[0]);
        console.log("GET request for specific user", res);
      })
      .catch((err) => console.log(err));
  };

  const toggleEdit = () => {
    setEditing(true);
  };

  const handleEdit = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  const submitEdit = (e) => {
    axios
      .patch(`http://localhost:3000/api/users/${id}`, edit)
      .then((res) => {
        console.log("PATCH request for edit", res);
        fetchUsers();
      })
      .catch((err) => console.log(err));
    setEditing(false);
  };

  const deleteUser = () => {
    axios
      .delete(`http://localhost:3000/api/users/${id}`)
      .then((res) => {
        console.log("DELETE request for edit", res);
        fetchUsers();
      })
      .catch((err) => console.log(err));
    setEditing(false);
    history.push('/');
  };

  return (
    <>
      {!editing ? (
        <div className="App">
          <div className="list">
            <h1>{edit.name}</h1>
            <h2>{edit.bio}</h2>

            <button onClick={toggleEdit}>Edit User</button>
            <button onClick={deleteUser}>Delete User</button>
            <button onClick={() => history.push('/')}>Back</button>
          </div>
        </div>
      ) : (
        <form onSubmit={submitEdit}>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={edit.name}
            onChange={handleEdit}
          />

          <input
            type="text"
            placeholder="Bio"
            name="bio"
            value={edit.bio}
            onChange={handleEdit}
          />

          <button type="submit">Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
    </>
  );
}

export default User;
