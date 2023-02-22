const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host:"localhost",
    password:"1234",
    user:"root",
    database:"fotos"
})

// let datos = {url:"xx",titulo:"locoo",likes:10,dislikes:9}

// let con = async () =>{
//     console.log(await pool.query("insert into fotos set ?",[datos]))
// } 

// con()

module.exports = pool