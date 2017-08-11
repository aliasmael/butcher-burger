var JsonDB = require('node-json-db');
var db = new JsonDB("db", true, false);

var Category = require('./../models/Category')

// Category repository is responsible for acting with database
var CategoryRepository = {
    
    // get all categories from db.json file
    getAllCategories: function () {

        try {
            var result = db.getData("/categories");;
            return { error: false, categories: result };               
        } catch (error) {
            return { error: true, message: error };
        }


    },

    // Add new category to db.json file
    addNewCategory: function (category) {
        category.id = category.guid();
        db.push("/categories", category.getAsJson(), false);

        return true;
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