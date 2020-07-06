import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import UserForm from './UserForm';
import UserList from './UserList';
import User from './User';
import './App.css';

function App() {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [])

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
    <div className='App'>
      <Route exact path='/'>
        <UserList users={users} />
        <UserForm fetchUsers={fetchUsers} />
      </Route>
      <Route path='/users/:id'>
        <User fetchUsers={fetchUsers} />
      </Route>
    </div>
  )
}

export default App;
