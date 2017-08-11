const express = require('express')  
const bodyParser = require('body-parser')
const app = express()
const port = 3000;

// use cors to allow host
var cors = require('cors')
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// use category routes under /api/category
app.use('/api/category', require('./routes/category').category);

// Handle error routes
app.use(function(req, res){
    res.sendStatus(404);
});

// start listing on port 3000
app.listen(port, function() {
    console.log("API server running on port", port);
});