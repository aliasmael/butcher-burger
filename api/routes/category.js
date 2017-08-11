const express = require('express')  
var category = express.Router();

// use cors to allow host
var cors = require('cors')
category.use(cors())

var CategoryModel = require('./../models/Category')


category.get('/get-all-categories', function(req, res, next) {
    
    var category = CategoryModel.Category;
    res.json( category.getAllCategories() );        

});

category.post('/add', function(req, res, next) {
    
    // Add new category
    var category = CategoryModel.Category;
    category.name = req.body.categoryName;
    category.description = req.body.categoryDescription;
    var saved = category.save() 
    res.json( { saved: saved } );

});

module.exports.category = category;