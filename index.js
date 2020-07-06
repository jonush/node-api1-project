const express = require('express');
const shortid = require('shortid');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

// shortid.generate()

let users = [
  {
    id: shortid.generate(),
    name: "Jane Doe",
    bio: "Not Tarzan's Wife, another Jane",
  },
  {
    id: shortid.generate(),
    name: "John Doe",
    bio: "Also Not Tarzan's Wife",
  }
]

// GET request to '/'
server.get('/', (req,res) => {
  res.send(`GET request to '/'`);
});

// GET request to '/api/users'
server.get('/api/users', (req,res) => {
  if(users) {
    res.json(users);
  }
  else {
    res.status(500).json({ errorMessage: "The users information could not be retrieved" });
  }
});

// POST request to '/api/users'
server.post('/api/users', (req,res) => {
  let user = req.body;
  if(user.name === '' || user.bio === '') {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
  } 
  else if(!user) {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
  }
  else {
    users.push(user);
    res.status(201).json(users);
  }
});

// GET request to 'api/users/:id'
server.get('/api/users/:id', (req,res) => {
  let id = req.params.id;
  if(id) {
    search = [];
    users.map(user => user.id === id ? search.push(user) : null);
    if(search.length < 1) {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    else {
      res.status(200).json(search);
    };
  }
  else {
    res.status(500).json({ errorMessage: "The user information could not be retrieved." });
  }
});

// DELETE request for '/api/users/:id'
server.delete('/api/users/:id', (req,res) => {
  let id = req.params.id;
  if(id) {
    users = users.filter(user => user.id !== id);
    if(users.length < 1) {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    else {
      res.status(200).json(users);
    }
  }
  else {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
});

// PATCH request for '/api/users/:id'
server.patch('/api/users/:id', (req,res) => {
  let id = req.params.id;
  let update = req.body;
  if(id) {
    search = [];
    users.map(user => user.id === id ? search.push(user) : null);
    if(search.length < 1) {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    else {
      if(update.name === '' || update.bio === '') {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
      } 
      else {
        search[0].name = update.name;
        search[0].bio = update.bio;
        users = users.filter(user => user.id !== search[0].id)
        users.push(search[0]);
        res.status(200).json(users);
      }
    };
  }
  else {
    res.status(500).json({ errorMessage: "The user information could not be modified." });
  }
});

server.listen(3000, () => console.log('\n == Server is running on port 3000 == \n'));


