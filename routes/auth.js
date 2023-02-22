var express = require('express');
var router = express.Router();
const pool = require("../database")

router.get('/registro', function(req, res, next) {

    res.render("registro")

});

router.post('/registro', function(req, res, next) {

    console.log(req.body)

});


module.exports = router;