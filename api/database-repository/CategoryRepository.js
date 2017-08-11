const jsonfile = require('jsonfile') // nodejs lib for easily reading and writing to json files
var db = 'db.json'; // dummy database file

// Category repository is responsible for acting with database
var CategoryRepository = {
    
    // get all categories from db.json file
    getAllCategories: function () {

        try {
            var result = jsonfile.readFileSync(db);
            return { error: false, categories: result.categories };               
        } catch (error) {
            return { error: true, message: error };
        }


    },

    // get all categories from db.json file
    addNewCategory: function (name, description) {
        // TO-Do
        return false;
    }
}

module.exports.CategoryRepository = CategoryRepository;