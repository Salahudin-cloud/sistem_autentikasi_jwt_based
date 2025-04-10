require("dotenv").config()
const mysql = require("mysql2")

const db = mysql.createConnection({
    host : process.env.HOST_DB,
    user : process.env.USER_DB,
    password : process.env.PASSWORD_DB,
    database : process.env.USER_DB
})  

db.connect(err => {
    if(err){
        console.error("FAILED CONNECT TO DATABASE",err)
    }else{
        console.log("SUCCESS CONNECT TO DATABASE")
    }
})

module.exports = db