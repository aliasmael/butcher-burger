const express = require('express')  
var category = express.Router();

const jsonfile = require('jsonfile') // nodejs lib for easily reading and writing to json files
var db = 'db.json'; // dummy database file

// use cors to allow host
var cors = require('cors')
category.use(cors())

category.get('/get-all-categories', function(req, res, next) {
    
    // read categories data from db.json file
    jsonfile.readFile(db, function(err, obj) {
        res.json({
            err: err,
            data: obj
        });
    });

});

module.exports.category = category;