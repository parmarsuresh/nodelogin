const express = require('express');
const app = express();
const path = require('path');
const port = 3003;
const index = require('../test_node_session/routes/index');
var bodyParser = require('body-parser');


//by default index.html page  is run 
// app.use(express.static(path.join(__dirname, "/public/")));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/', index);


app.listen(port, () => {
     console.log(`listening port number ${port}`);
})