var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/butcherBurger";

var Category = require('./../models/Category')

// Category repository is responsible for acting with database
var CategoryRepository = {
    
    // get all categories from db.json file
    getAllCategories: function (callback) {

        MongoClient.connect(url, function(err, db) {
            if (err)
                callback( { error: false, message: err } );

            db.collection("categories").find().toArray(function(err, result) {
                if (err)
                    callback( { error: false, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, categories: result } );
            });
        });
    },

    // Add new category to db.json file
    addNewCategory: function (category, callback) {
        category.id = category.guid();

        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: false, message: err } );

            db.collection("categories").insertOne(category.getAsJson(), function(err, res) {
                if (err)
                    callback( { error: false, message: err } );
                
                // close connection with DB
                db.close();
                
                // return result to callback
                callback( { error: false, category: category } );
            });
        });
    },

    // add new category_item to db.json file
    addNewItem: function (item) {
        categoryId = item.categoryId;
        item.id = category.guid();
        db.push("/categories/", item.getAsJson(), false);

        return true;
    }
}

module.exports.CategoryRepository = CategoryRepository;