const mysql = require("mysql2/promise")

const pool = mysql.createPool({
    host:"bzcvslh9cpp6tdzsqeif-mysql.services.clever-cloud.com",
    password:"v2L0hwnf0QvwJj2RgDVC",
    user:"u4ffzd7fekuncb52",
    database:"bzcvslh9cpp6tdzsqeif"
})

// let datos = {url:"xx",titulo:"locoo",likes:10,dislikes:9}

// let con = async () =>{
//     console.log(await pool.query("insert into fotos set ?",[datos]))
// } 

// con()

module.exports = pool