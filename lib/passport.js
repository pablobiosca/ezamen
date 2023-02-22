const passport = require("passport")
const localstrategy = require("passport-local").Strategy

const pool = require("../database")

//registro
passport.use("local.registrar", new localstrategy({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
}, async (req,username,password,done) =>{
    const [result] = await pool.query("insert into users set ?",[{username,password}])
    done(null)

    // const [result] = await pool.query("insert into users set ?",[req.body])
    // res.redirect("/registro")
}))

//login
passport.use("local.login", new localstrategy({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
}, async (req,username,password,done) =>{
    const [result] = await pool.query("")
    done(null)

    // const [result] = await pool.query("insert into users set ?",[req.body])
    // res.redirect("/registro")
}))