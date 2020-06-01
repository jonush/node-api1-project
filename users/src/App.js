import React, { useState, useEffect } from 'react';
import { useParams, Route, Switch } from 'react-router-dom';
import UserForm from './UserForm';
import UserList from './UserList';
import User from './User';
import './App.css';

function App() {
  return (
    <>
      <Route exact path='/'>
        <UserList />
        <UserForm />
      </Route>
      <Route path='/users/:id'>
        <User />
      </Route>
    </>
  )
}

export default App;
