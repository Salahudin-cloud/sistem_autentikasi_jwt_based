const mysql = require("mysql2")


const db = mysql.createConnection({
    host : 'localhost',
    user : "RadsDev",
    password : "belajar_sql123",
    database : "belajar_sql"
})  

db.connect(err => {
    if(err){
        console.error("FAILED CONNECT TO DATABASE",err)
    }else{
        console.log("SUCCESS CONNECT TO DATABASE")
    }
})

module.exports = db