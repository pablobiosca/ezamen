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

router.get('/login', function(req, res, next) {

    res.render("login")

});

router.post('/login',(req,res,next)=>{
    
    passport.authenticate("local.login", {

    successRedirect:"/fotos",
    failureRedirect:"/login",
    failureFlash:true

})

    (req,res,next)

});


router.get("/logout" ,(req,res) =>{
    req.logOut( function(err){
      if(err){
        return next(err)
      }
    })
    res.redirect("/login")
})


module.exports = router;