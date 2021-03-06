var clone = require('clone');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
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

            db.collection("categories").findOne({ _id: ObjectId(categoryId) }, function(err, result) {
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
        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            var json = category.getAsJson();

            db.collection("categories").insertOne(json, function(err, res) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();

                category._id = json._id;

                // return result to callback
                callback( { error: false, category: category } );
            });
        });
    },

    // add new category_item
    addNewItem: function (item, callback) {
        item._id = item.guid();
        categoryId = item.categoryId;
        
        // get object of this to be used inside next function
        var that = this;

        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            // get category by id
            that.getCategory( categoryId, function(result) {
                var category = result.category;
                
                // Check category object has data
                if ( !category ) {
                    callback( { error: true, message: 'Could not find item category.' } );
                    return;
                }

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
            that.getCategory( categoryId, function(result) {
                var category = result.category;

                // Check category object has data
                if ( !category ) {
                    callback( { error: true, message: 'Could not find item category.' } );
                    return;
                }
                
                // add category data
                var newvalues = clone(category);
                
                // Delete required item
                var filteredItems = newvalues.items.filter(function(elm) {
                    return (elm._id != item._id);
                });
                newvalues.items = filteredItems;

                // update category
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

            db.collection("categories").deleteOne({_id: ObjectId(categoryId) }, function(err, res) {
                if (err)
                    callback( { error: true, message: err } );
                
                // close connection with DB
                db.close();
                
                // return result to callback
                callback( { error: false, categoryId: categoryId } );
            });
        });

    },

    // delete category
    updateCategory: function (category, callback) {

        // get object of this to be used inside next function
        var that = this;

        MongoClient.connect(url, function(err, db) {
            if (err) 
                callback( { error: true, message: err } );

            // get category by id
            that.getCategory( category._id, function(result) {
                var oldValues = result.category;
                var newvalues = category.getAsJson(true);

                // update category
                db.collection("categories").updateOne(oldValues, newvalues, function(err, res) {
                    if (err)
                        callback( { error: true, message: err } );
                    
                    // close connection with DB
                    db.close();
                    
                    // return result to callback
                    callback( { error: false, category:category } );
                });
            });
        });

    }
}

module.exports.CategoryRepository = CategoryRepository;