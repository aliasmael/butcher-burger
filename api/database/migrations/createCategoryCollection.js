var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/butcherBurger";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("categories", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});