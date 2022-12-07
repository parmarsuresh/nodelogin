const mongoose = require('mongoose');

const user = new mongoose.Schema({
     Name: {
          type: String,
     },
     Email: {
          type: String,
     },
     Password: {
          type: String,
     }
})

const users = mongoose.model('User', user);
module.exports = users;