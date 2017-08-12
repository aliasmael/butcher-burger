// use CategoryRepository for accessing database
const CategoryRepository = require('./../repositories/CategoryRepository');
var categoryRepository = CategoryRepository.CategoryRepository;

var ObjectId = require('mongodb').ObjectID;

// Category repository is responsible for acting with database
var Category = {

    name: '',
    description: '',
    items: [],
    
    // get all categories
    getAllCategories: function ( callback ) {
        categoryRepository.getAllCategories(function (res) {
            callback(res);
        });
    },

    // add new categories
    save: function ( callback ) {
        categoryRepository.addNewCategory( this, function (result) {
            callback(result);
        });
    },

    // delete category
    delete: function ( callback ) {
        categoryRepository.deleteCategory( this._id, function (result) {
            callback(result);
        });
    },

    // update category
    update: function ( callback ) {
        categoryRepository.updateCategory( this, function (result) {
            callback(result);
        });
    },

    // get all categories
    getAsJson: function (withId) {
        if ( withId ) 
            return { _id: ObjectId(this._id), name: this.name, description: this.description, items: this.items };
        else
            return { name: this.name, description: this.description, items: this.items };            
    },

    addItem: function (item) {
        this.items.push(item);
    }
}

module.exports.Category = Category;