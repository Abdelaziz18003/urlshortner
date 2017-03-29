var express = require('express');
var router = express.Router();
var assert = require("assert");
var mongo = require("mongodb").MongoClient;
var DB_URI = require("../config").DB_URI;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET the shortened URL. */
router.get('/:shortUrl', function(req, res, next) {

    // connect to the database
    mongo.connect(DB_URI, function(err, db) {
        assert.equal(err, null, "can not connect to the database");

        // search for the unique document containing the provided short url
        var urls = db.collection("urls");
        urls.find({ shortUrl: req.params.shortUrl }).toArray(function(err, docs) {

            if (docs.length > 0) {

                // redirect to corresponding original url
                res.redirect(docs[0].longUrl);
            } else {
                res.render("error", {
                    message: "page not found",
                    error: {
                        status: 404,
                        stack: "the url you have entered doesn't exist in the database"
                    }
                });
            }
        })
    })
});

module.exports = router;