var express = require('express');
var router = express.Router();
const pool = require("../database")
const passport = require("passport")

router.get('/registro', function(req, res, next) {

    res.render("registro")

});

router.post('/registro',passport.authenticate("local.registrar", {

    successRedirect:"/fotos",
    failureRedirect:"/registro",
    failureFlash:true

}));




module.exports = router;