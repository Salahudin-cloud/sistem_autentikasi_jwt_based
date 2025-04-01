const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("./db/db")
const app = express();
const port = 8000;
const bodyParser = require("body-parser")
require("dotenv").config()

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    db.query("SELECT * FROM autentikasi",async(error,result)=>{
        if(error){
            return res.status(500).send({message : "something was wrong!."})
        }
        
        res.status(200).send({
            message : "success fetching data",
            data : result
        })
    })
})

app.post("/login",(req,res)=>{
    const {username,password} = req.body;
    db.query('SELECT * FROM autentikasi WHERE username = ?',[username],async(error,result)=>{
        if(error || result.length === 0){
            return res.status(401).send({message : "Invalid credentials"})
        }

        const user = result[0]
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).send({message : "Invalid credentials password!"})
        }

        const token = jwt.sign({id : user.id,username : user.username},process.env.JWT_SECRET,{expiresIn : '1h'})
        res.send({
            token
        })
    })
})


const authenticateToken = (req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token && req.cookies && req.cookies.token){
        token
        return res.status(403).send({message : "token not exist!"})
    }

    jwt.verify(token.split(' ')[1],process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return res.status(403).send({message : "invalid token!"})
        }
        req.user = user
        return next()
    })

}

app.get('/protected',authenticateToken,(req,res)=>{
    res.send({message : `hello ${req.user.username}, welcome back!`})
})

app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`)
})