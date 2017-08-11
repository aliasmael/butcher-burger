var clone = require('clone');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/butcherBurger";

var Category = require('./../models/Category')

// Category repository is responsible for acting with database
var CategoryRepository = {
    
    // get all categories
    getAllCategories: function (callback) {

        MongoClient.connect(url, function(err, db) {
            if (err)
                callback( { error: true, message: err } );

            db.collection("categories").find().toArray(function(err, result) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, categories: result } );
            });
        });
    },

    // get category by id
    getCategory: function ( categoryId, callback ) {

        MongoClient.connect(url, function(err, db) {
            if (err)
                callback( { error: true, message: err } );

            db.collection("categories").findOne({ id: categoryId }, function(err, result) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();

                // return result to callback
                callback( { error: false, category: result } );
            });
        });
    },

    // Add new category
    addNewCategory: function (category, callback) {
        category.id = category.guid();

        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            db.collection("categories").insertOne(category.getAsJson(), function(err, res) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();
                
                // return result to callback
                callback( { error: false, category: category } );
            });
        });
    },

    // add new category_item
    addNewItem: function (item, callback) {
        item.id = item.guid();
        categoryId = item.categoryId;
        
        // get object of this to be used inside next function
        var that = this;

        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            // get category by id
            that.getCategory( parseInt(categoryId), function(result) {
                var category = result.category;
                
                // add category data
                var newvalues = clone(category);
                newvalues.items.push(item);

                db.collection("categories").updateOne(category, newvalues, function(err, res) {
                    if (err)
                        callback( { error: true, message: err } );
                    
                    // close connection with DB
                    db.close();
                    
                    // return result to callback
                    callback( { error: false, item: item, newvalues: newvalues, category:category } );
                });
            });
        });

    },

    // delete category_item
    deleteItem: function (item, callback) {
        categoryId = item.categoryId;
        
        // get object of this to be used inside next function
        var that = this;

        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            // get category by id
            that.getCategory( parseInt(categoryId), function(result) {
                var category = result.category;
                
                // add category data
                var newvalues = clone(category);
                var index = newvalues.items.indexOf(item);
                newvalues.items.splice(index);


                db.collection("categories").updateOne(category, newvalues, function(err, res) {
                    if (err)
                        callback( { error: true, message: err } );
                    
                    // close connection with DB
                    db.close();
                    
                    // return result to callback
                    callback( { error: false, item: item, newvalues: newvalues, category:category } );
                });
            });
        });

    },

    // delete category
    deleteCategory: function (categoryId, callback) {

        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            db.collection("categories").deleteOne({id: parseInt(categoryId)}, function(err, res) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();
                
                // return result to callback
                callback( { error: false, categoryId: categoryId } );
            });
        });

    }
}

module.exports.CategoryRepository = CategoryRepository;