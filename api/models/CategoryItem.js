// use CategoryRepository for accessing database
const CategoryRepository = require('./../database-repository/CategoryRepository');
var categoryRepository = CategoryRepository.CategoryRepository;

// Category repository is responsible for acting with database
var CategoryItem = {

    _id: '',
    name: '',
    description: '',
    price: '',
    categoryId: '',

    // Add new category item
    save: function ( callback ) {
        categoryRepository.addNewItem( this, function (result) {
            callback(result);
        });
    },

    // Add new category item
    delete: function ( callback ) {
        categoryRepository.deleteItem( this, function (result) {
            callback(result);
        });
    },


    // get parse item to json
    getAsJson: function () {
        return { _id: this._id, name: this.name, description: this.description, price: this.price };
    }
    ,
    // generate uniqe guid
    guid: function () {
        return (new Date()).getTime();
    }
}

module.exports.CategoryItem = CategoryItem;