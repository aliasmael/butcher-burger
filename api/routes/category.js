const express = require('express')  
var category = express.Router();

// use cors to allow host
var cors = require('cors')
category.use(cors())

// use CategoryRepository for accessing database
const CategoryRepository = require('./../database-repository/CategoryRepository');
var categoryRepository = CategoryRepository.CategoryRepository;

category.get('/get-all-categories', function(req, res, next) {
    
    // read categories data CategoryRepository
    res.json( categoryRepository.getAllCategories() );

});

category.post('/add', function(req, res, next) {
    
    // Add new category
    res.json( categoryRepository.addNewCategory(req.categoryName, req.categoryDescription) );

});

module.exports.category = category;