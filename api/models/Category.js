// use CategoryRepository for accessing database
const CategoryRepository = require('./../database-repository/CategoryRepository');
var categoryRepository = CategoryRepository.CategoryRepository;

// Category repository is responsible for acting with database
var Category = {

    id: '',
    name: '',
    description: '',
    items: [],
    
    // get all categories from db.json file
    getAllCategories: function ( callback ) {
        categoryRepository.getAllCategories(function (res) {
            callback(res);
        });
    },

    // get all categories from db.json file
    save: function ( callback ) {
        categoryRepository.addNewCategory( this, function (result) {
            callback(result);
        });
    },


    // get all categories from db.json file
    getAsJson: function () {
        return { id: this.id, name: this.name, description: this.description, items: this.items };
    },

    guid: function () {
        return (new Date()).getTime();
    }
}

module.exports.Category = Category;