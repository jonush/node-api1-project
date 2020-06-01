import React, { useState, useEffect } from 'react';
import { useParams, Route, Switch } from 'react-router-dom';
import UserForm from './UserForm';
import axios from 'axios';
import './App.css';

function User() {
  const [ edit, setEdit ] = useState([]);
  const [ editing, setEditing ] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, [])

  const getUser = () => {
    axios
      .get(`http://localhost:3000/api/users/${id}`)
      .then(res => {
        setEdit(res.data);
        console.log('GET request for users')
      })
      .catch(err => console.log(err));
  }

  const toggleEdit = () => {
    getUser();
    setEditing(true);
  }

  const handleEdit = e => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    })
  }

  const submitEdit = e => {
    axios
      .patch(`http://localhost:3000/api/users/${id}`, edit)
      .then(res => console.log('PATCH request for edit', res))
      .catch(err => console.log(err));
    setEditing(false);
  }

  const deleteUser = () => {
    axios
      .delete(`http://localhost:3000/api/users/${id}`)
      .then(res => console.log('DELETE request for edit', res))
      .catch(err => console.log(err));
    setEditing(false);
  }

  return (
    <Switch>
    <Route exact path='/users/:id'>
    <div className="App">
      <div className='list'>
        <h1>{edit.name}</h1>
        <h2>{edit.bio}</h2>

        <button onClick={toggleEdit}>Edit User</button>
        <button onClick={deleteUser}>Delete User</button>
      </div>
    </div>
      </Route>
      <Route path='users/:id' component={User}/>
    </Switch>
  );
}

export default User;
