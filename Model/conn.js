const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/testDB").then(() => {
     console.log("connection is successful");
}).catch((e) => {
     console.log("No connection");
})
