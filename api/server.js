const express = require('express')  
const app = express()
const port = 3000;

// use cors to allow host
var cors = require('cors')
app.use(cors())

// use category routes under /api/category
app.use('/api/category', require('./routes/category').category);

// start listing on port 3000
app.listen(port, function() {
    console.log("API server running on port", port);
});