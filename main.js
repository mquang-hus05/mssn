const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const dataAuth = [
  {
    email: 'michael.lawson@reqres.in',
    password: 'MichaelPass123!'
  },
  {
    email: 'lindsay.ferguson@reqres.in',
    password: 'LindsayPass456!'
  },
  {
    email: 'tobias.funke@reqres.in',
    password: 'TobiasPass789!'
  }
];

const userInfo = [
    {
        email: 'michael.lawson@reqres.in',
        first_name: 'Michael',
        last_name: 'Lawson',
        avatar: 'https://reqres.in/img/faces/7-image.jpg',
    },
    {
        email: 'lindsay.ferguson@reqres.in',
        first_name: 'Lindsay',
        last_name: 'Ferguson',
        avatar: 'https://reqres.in/img/faces/8-image.jpg',
    },
    {
        email: 'tobias.funke@reqres.in',
        first_name: 'Tobias',
        last_name: 'Funke',
        avatar: 'https://reqres.in/img/faces/9-image.jpg',
    },
    {
        email: 'byron.fields@reqres.in',
        first_name: 'Byron',
        last_name: 'Fields',
        avatar: 'https://reqres.in/img/faces/10-image.jpg',
    },
    {
        email: 'george.edwards@reqres.in',
        first_name: 'George',
        last_name: 'Edwards',
        avatar: 'https://reqres.in/img/faces/11-image.jpg',
    },
    {
        email: 'rachel.howell@reqres.in',
        first_name: 'Rachel',
        last_name: 'Howell',
        avatar: 'https://reqres.in/img/faces/12-image.jpg',
    },
];

// Simple login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = dataAuth.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(userInfo);
});

// Get user by email
app.get('/api/users/:email', (req, res) => {
  const user = userInfo.find(u => u.email === req.params.email);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Get users by first name
app.get('/api/users/firstname/:firstName', (req, res) => {
  const filteredUsers = userInfo.filter(u => u.first_name.toLowerCase() === req.params.firstName.toLowerCase());
  res.json(filteredUsers);
});

// Get users by last name
app.get('/api/users/lastname/:lastName', (req, res) => {
  const filteredUsers = userInfo.filter(u => u.last_name.toLowerCase() === req.params.lastName.toLowerCase());
  res.json(filteredUsers);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server listening on http://localhost:3000');
});
