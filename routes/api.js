var express = require('express');
var assert = require("assert");
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var shorten = require("../functions/shorten");

const DB_URI = require("../config").DB_URI;
const APP_URI = require("../config").APP_URI;
const PORT = require("../config").PORT

/* GET api description. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* shortner a Url. */
router.get('/shorten/*', function(req, res, next) {

    mongo.connect(DB_URI, function(err, db) {
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
                shortUrl: shorten(maxCounter + 1)
            };
            urls.insert(dbItem, function() {

                // respond with a json file
                res.json({
                    longUrl: dbItem.longUrl,
                    shortUrl: "http://" + APP_URI + ":" + PORT + "/" + dbItem.shortUrl
                });
                db.close();
            });
        });
    });
})
module.exports = router;