const passport = require("passport")
const localstrategy = require("passport-local").Strategy

const pool = require("../database")
const crypt = require("../lib/encriptacion")

//registro
passport.use("local.registrar", new localstrategy({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
}, async (req,username,password,done) =>{

    console.log(req.body)

    password = await crypt.encriptar(password)

    const new_user = {username,password}
    const [result] = await pool.query("insert into users set ?",[new_user])
    console.log(result)
    new_user.id = result.insertId

    return done(null,new_user)

    // const [result] = await pool.query("insert into users set ?",[req.body])
    // res.redirect("/registro")
}))

//login
passport.use("local.login", new localstrategy({
    usernameField:"username",
    passwordField:"password",
    passReqToCallback:true
}, async (req,username,password,done) =>{

    const [result] = await pool.query("select * from users where username = ?",[username])

    if (result.length>0){

        const user = result[0]
        const comprobacion = crypt.desencriptar(password,user.password)

        if (comprobacion){
            console.log("existe!!")
            return done(null,user,req.flash("message","sesion iniciada"))
        }else{
            return done(null,false,req.flash("message","contrasena incorrecta"))
        }
    }else{
        return done(null,false,req.flash("message","No existe este usuario"))
    }

}))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async(id,done) =>{

    const [rows] = await pool.query("select * from users where id = ?",[id])

    let usuario = rows[0]

    done(null,usuario)
} )