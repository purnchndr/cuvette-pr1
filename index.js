const express = require('express');
const mongoose = require('mongoose');

const uri =
  'mongodb+srv://pratap:pratap@cluster0.fsedyqk.mongodb.net/natours?retryWrites=true&w=majority';

const TestUser = require('./models/usersModel');

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Request received' });
});

app.get('/api/users', async (req, res, next) => {
  const users = await TestUser.find();
  res.status(200).json({ message: 'Request received', data: users });
});

app.get('/api/users/:id', async (req, res, next) => {
  try {
    const users = await TestUser.findById(req.params.id);
    res.status(200).json({ message: 'Request received', data: users });
  } catch (e) {
    res.status(500).json({ message: 'bad received' + e.message });
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    const user = new TestUser(req.body);
    const responce = await user.save();
    res.status(200).json({ message: 'Request received', data: responce });
  } catch (e) {
    res.status(500).json({ message: 'bad received' + e.message });
  }
});

app.delete('/api/users/:id', async (req, res, next) => {
  try {
    const user = await TestUser.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Request received', data: user });
  } catch (e) {
    res.status(500).json({ message: 'bad received' + e.message });
  }
});

app.patch('/api/users/:id', async (req, res, next) => {
  try {
    const user = await TestUser.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Request received', data: user });
  } catch (e) {
    res.status(500).json({ message: 'bad received' + e.message });
  }
});

mongoose
  .connect(uri)
  .then(() => console.log('DB Connected'))
  .catch(e => console.log(e.message));

app.listen(3000, () => console.log('App is listening on port 3000'));
