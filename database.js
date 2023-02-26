const mysql = require("mysql2/promise")

//volcamos al process env
require("dotenv").config()

let pool

if (process.env.NODE_ENV=="develop"){
    pool = mysql.createPool({
        host:"localhost",
        password:"1234",
        user:"root",
        database:"fotos",
        port:3306
    })
    
}else{
    pool = mysql.createPool({
        host:process.env.MYSQL_HOST,
        password:process.env.MYSQL_PASSWORD,
        user:process.env.MYSQL_USER,
        database:process.env.MYSQL_DATABASE
    })
}


// let datos = {url:"xx",titulo:"locoo222",likes:10,dislikes:9}

// let con = async () =>{
//     console.log(await pool.query("insert into fotos set ?",[datos]))
// } 

// con()



module.exports = pool