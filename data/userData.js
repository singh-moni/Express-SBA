const User = require('../models/user');

let users = [
  { id: 1, name: 'David Copperfield', email: 'dc@author.uk' },
  { id: 2, name: 'Robinson Crusoe', email: 'rc@publisher.com' },
  { id: 3, name: 'King Charles', email: 'ukking@us.gov' },
  { id: 4, name: 'Robin Sharma', email: 'rs@ferrari.com' },
  { id: 5, name: 'Shammi Kapoor', email: 'bollywood@goldenera.com' }
];

module.exports = {
  getAllUsers: () => users,
  getUserById: (id) => users.find(user => user.id === id),
  createUser: (name, email) => {
    const newUser = new User(users.length + 1, name, email);
    users.push(newUser);
    return newUser;
  },
  updateUser: (id, name, email) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    users[userIndex] = { ...users[userIndex], name, email };
    return users[userIndex];
  },
  deleteUser: (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }
};