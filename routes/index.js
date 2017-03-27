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
        assert.equal(null, err, "can not connect to the database");

        var urls = db.collection("urls");
        var resultArray = [];

        // search for the unique document containing the provided short url
        var cursor = urls.find({ shortUrl: req.params.shortUrl });
        cursor.forEach(function(doc) {
            resultArray.push(doc);
        }, function() {
            res.redirect(resultArray[0].longUrl);
        })
    })
});


module.exports = router;