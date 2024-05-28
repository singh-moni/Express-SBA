const express = require('express');
const router = express.Router();
const userData = require('../data/userData'); // Ensure this path is correct

router.get('/', (req, res) => {
  const users = userData.getAllUsers();
  res.json(users);
});

router.get('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = userData.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = userData.createUser(name, email);
  res.status(201).json(newUser);
});

router.put('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { name, email } = req.body;
  const updatedUser = userData.updateUser(userId, name, email);
  if (!updatedUser) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(updatedUser);
});

router.delete('/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const success = userData.deleteUser(userId);
  if (!success) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.sendStatus(204);
});

module.exports = router;
