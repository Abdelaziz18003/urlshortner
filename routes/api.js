var express = require('express');
var assert = require("assert");
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var shorten = require("../functions/shorten")
var dbUri = "mongodb://localhost:27017/url-shortner";
var appUri = "localhost:3000/"

/* GET api description. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* shortner a Url. */
router.get('/shorten/*', function(req, res, next) {

    mongo.connect(dbUri, function(err, db) {
        assert.equal(null, err);

        var urls = db.collection("urls");
        var resultsArray = [];
        var maxCounter = 0;
        var dbItem = {};

        // get the max value of counter
        var cursor = urls.find().sort({ counter: -1 }).limit(1);

        cursor.forEach(function(doc) {
            resultsArray.push(doc);
        }, function() {
            maxCounter = resultsArray[0].counter;

            // save the url infos to the database
            dbItem = {
                counter: maxCounter + 1,
                longUrl: req.params[0],
                shortUrl: appUri + shorten(maxCounter + 1)
            };
            urls.insert(dbItem, function() {

                // when inserting is done respond with a json file
                res.json({ longUrl: dbItem.longUrl, shortUrl: dbItem.shortUrl });
                db.close();
            });
        });
    });
})
module.exports = router;