var express = require('express');
var router = express.Router();

/* GET api description. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* shortner a Url. */
router.get('/shorten/:longUrl', function(req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;