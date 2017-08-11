// use CategoryRepository for accessing database
const CategoryRepository = require('./../database-repository/CategoryRepository');
var categoryRepository = CategoryRepository.CategoryRepository;

// Category repository is responsible for acting with database
var CategoryItem = {

    id: '',
    name: '',
    description: '',
    price: '',
    categoryId: '',

    // Add new category item
    save: function () {
        return categoryRepository.addNewCategory( this );
    },


    // get parse item to json
    getAsJson: function () {
        return [{ id: this.id, name: this.name, description: this.description, price: this.price }]
    },

    // generate uniqe guid
    guid: function () {
        return (new Date()).getTime();
    }
}

module.exports.CategoryItem = CategoryItem;