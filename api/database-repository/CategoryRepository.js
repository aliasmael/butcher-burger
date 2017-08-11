var clone = require('clone');
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

    // get all categories from db.json file
    getCategory: function ( categoryId, callback ) {

        MongoClient.connect(url, function(err, db) {
            if (err)
                callback( { error: false, message: err } );

            db.collection("categories").findOne({ id: categoryId }, function(err, result) {
                if (err)
                    callback( { error: false, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, category: result } );
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
    addNewItem: function (item, callback) {
        item.id = item.guid();
        categoryId = item.categoryId;
        
        // get object of this to be used inside next function
        var that = this;

        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: false, message: err } );

            // get category by id
            that.getCategory( parseInt(categoryId), function(result) {
                var category = result.category;
                
                // add category data
                var newvalues = clone(category);
                newvalues.items.push(item);

                db.collection("categories").updateOne(category, newvalues, function(err, res) {
                    if (err)
                        callback( { error: false, message: err } );
                    
                    // close connection with DB
                    db.close();
                    
                    // return result to callback
                    callback( { error: false, item: item, newvalues: newvalues, category:category } );
                });
            });
        });

    }
}

module.exports.CategoryRepository = CategoryRepository;