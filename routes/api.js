var express = require('express');
var assert = require("assert");
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var shorten = require("../functions/shorten");

// load constant from config file
const DB_URI = require("../config").DB_URI;
const APP_URI = require("../config").APP_URI;
const PORT = require("../config").PORT;

/* GET api description. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* shortening a new Url. */
router.get('/new/*', function(req, res, next) {

    mongo.connect(DB_URI, function(err, db) {
        assert.equal(null, err);

        var newUrl = {};

        // get the max value of counter
        var urls = db.collection("urls");
        urls.count({}, function(err, docsNum) {
            assert.equal(err, null, "error counting the number of docs");

            // make a new url object
            newUrl = {
                longUrl: req.params[0],
                shortUrl: shorten(docsNum + 1)
            };

            // save the new url to the database
            urls.insert(newUrl, function() {

                // respond with a json file containing both the long and the short urls
                res.json({
                    longUrl: newUrl.longUrl,
                    shortUrl: "http://" + APP_URI + ":" + PORT + "/" + newUrl.shortUrl
                });
                db.close();
            });
        });
    });
})
module.exports = router;