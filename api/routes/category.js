const express = require('express')  
var category = express.Router();

// use cors to allow host
var cors = require('cors')
category.use(cors())

var CategoryModel = require('./../models/Category'); // Category Model
var CategoryItemModel = require('./../models/CategoryItem'); // CategoryItem Model

// getting all categories
category.get('/get-all-categories', function(req, res, next) {
    var category = CategoryModel.Category;
    category.getAllCategories( function (result) {
        res.json( result );
    });
});

// Add new category
category.post('/add', function(req, res, next) {
    
    // Add new category
    var category = CategoryModel.Category;
    category.name = req.body.categoryName;
    category.description = req.body.categoryDescription;
    
    category.save( function(result) {
        res.json( result );
    }) 

});

// Add new category_item
category.post('/add-item', function(req, res, next) {
    
    // Add new category_item
    var item = CategoryItemModel.CategoryItem;
    item.name = req.body.itemName;
    item.description = req.body.itemDescription;
    item.price = req.body.itemPrice;
    item.categoryId = req.body.categoryId;
    item.save( function (result) {
        res.json( result );
    }) 

});

module.exports.category = category;