require('dotenv').config();
const e = require('express');
const jwt = require('jsonwebtoken')

module.exports = async function authenticateToken(req, res, next) {
    try{
        if(!req.headers['authorization']) return res.status(401).send("Unauthorized")
        const authHeader = req.headers['authorization']
        if (!authHeader ||  authHeader =="" ) return res.sendStatus(401).send("Unauthorized")

        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).send("Unauthorized")

        
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            // console.log(err)
            if (err) return res.status(401).send("Unauthorized")
            let collection = "AuthToken"


            // console.log(keyEmail)

            let authToken = {}
            authToken  = await app.listeners(dbCall)[0]( collection, 'getById', user.token, {})
            // console.log("checking auth token", authToken)
            if(!authToken){
                return res.status(403).send({message: "User has logged out"})
            }
            else{

                isUserExists  = await app.listeners(dbCall)[0]( "Users", 'getById', user.user, {})
                req.user = isUserExists
                next()
            }
                    
                                   
                

            
            
        })
    }catch(e){
        console.log(e)
        res.status(500).send("Unauthorized")
    }
  }
