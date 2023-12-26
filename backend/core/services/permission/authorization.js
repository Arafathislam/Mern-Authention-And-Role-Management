require('dotenv').config();
const e = require('express');
const jwt = require('jsonwebtoken');
const { db } = require('../../database');
const userView = require('../user/userView')
const _ = require('lodash')
module.exports = {
    authorization: async function (req, res, next) {
        try {
            if (!req.headers['authorization']) return res.status(401).send("Unauthorized")
            const authHeader = req.headers['authorization']
            if (!authHeader || authHeader == "") return res.sendStatus(401).send("Unauthorized")

            const token = authHeader && authHeader.split(' ')[1]
            if (token == null) return res.status(401).send("Unauthorized")




            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
                if (err) return res.status(401).send("Unauthorized")
                const authCollection = "AuthToken"
                const userCollection = "Users_V2"

                let authToken = {}
                let result = await db.collection(authCollection).findOne(user.token)
                authToken = result.data
                if (!authToken) {
                    return res.status(403).send({ message: "User has logged out" })
                }
                else {

                    let isUserExists = await db.collection(userCollection).findOne(user.user, userView)
                    if (_.isEmpty(isUserExists.data)) return res.status(403).send({ message: "User has logged out" })
                    req.user = isUserExists.data

                    next()
                }






            })
        } catch (e) {
            console.log(e)
            res.status(500).send("Unauthorized")
        }
    },
    async logout (req, res) {
        // console.log("logout hit")
    
        if(!req.headers['authorization']) 
        {
            res.status(401).send("Unauthorized")
            return
        }
    
        const authHeader = req.headers['authorization']
        if (!authHeader ||  authHeader =="" || !req.headers['authorization']) return res.sendStatus(401).send("Unauthorized")
    
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).send("Unauthorized")
        let user = {}
        
      
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            // console.log(err)
            if (err) return res.status(401).send("Unauthorized")
            let collection = "AuthToken"
    
            await db.collection(collection).delete(user.token)
            
            res.status(203).send({message: "User has been logged out"})
                // user
                // next()
                
            return {
                error: false,
                httpStatus: 200,
                data:{},
                message: "Logged out"
            }
            
        })
        
        
    
      }
    
}