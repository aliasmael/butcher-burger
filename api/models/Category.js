// use CategoryRepository for accessing database
const CategoryRepository = require('./../repositories/CategoryRepository');
var categoryRepository = CategoryRepository.CategoryRepository;

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

    // get all categories
    getAsJson: function () {
        return { name: this.name, description: this.description, items: this.items };
    },

    addItem: function (item) {
        this.items.push(item);
    }
}

module.exports.Category = Category;