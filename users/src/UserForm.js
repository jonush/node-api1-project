import React, { useState } from 'react';
import shortid from 'shortid';
import axios from 'axios';
import './App.css';

const initialUser = {
  id: shortid.generate(),
  name: '',
  bio: ''
};

const UserForm = ({ fetchUsers }) => {
  const [ user, setUser ] = useState(initialUser);

  const handleInput = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/api/users', user)
      .then(res => {
        console.log('POST request for user', res);
        fetchUsers();
      })
      .catch(err => console.log(err));
    setUser(initialUser);
  }

  return (
    <div className='create'>
      <form onSubmit={handleSubmit}>
        <h2>Add a User</h2>
        <input 
          type='text'
          placeholder='Name'
          name='name'
          value={user.name}
          onChange={handleInput}
        />

        <input 
          type='text'
          placeholder='Bio'
          name='bio'
          value={user.bio}
          onChange={handleInput}
        />

        <button type='submit'>Add User</button>
      </form>
    </div>
  );
}

export default UserForm;