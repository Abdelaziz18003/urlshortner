var express = require('express');
var assert = require("assert");
var router = express.Router();
var mongo = require("mongodb").MongoClient;
var shorten = require("../functions/shorten");
var validator = require("validator");

// load constant from config file
const DB_URI = require("../config").DB_URI;
const APP_URI = require("../config").APP_URI;
const PORT = require("../config").PORT;
const NODE_ENV = require("../config").NODE_ENV;

/* GET api description. */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* shortening a new Url. */
router.get('/*', function (req, res, next) {

    // check if the passed string is a valid URL
    if (validator.isURL(req.params[0])) {

        mongo.connect(DB_URI, function (err, db) {
            assert.equal(null, err);

            var newUrl = {};

            // get the max value of counter
            var urls = db.collection("urls");
            urls.count({}, function (err, docsNum) {
                assert.equal(err, null, "error counting the number of docs");

                // make a new url object
                newUrl = {
                    longUrl: req.params[0],
                    shortUrl: shorten(docsNum + 1)
                };

                // save the new url to the database
                urls.insert(newUrl, function () {

                    // respond with a json file containing both the long and the short urls
                    res.json({
                        longUrl: newUrl.longUrl,
                        shortUrl: "https://" + APP_URI + (NODE_ENV == "development" ? ":" + PORT : "") + "/" + newUrl.shortUrl
                    });
                    db.close();
                });
            });
        });
        // response when the passed string is not a valid URL
    } else {
        res.json({
            "error": "you have passed an invalid URL"
        })
    }
})
module.exports = router;