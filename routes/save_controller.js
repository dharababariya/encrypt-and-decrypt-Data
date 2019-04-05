const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const knex = require('../helpers/knex');

router.post('/v1/savecontroller',verifyToken, async(req, res, next) => {
   

    try {
        const encrypt_username = encrypt(req.body.username);
        const encrypt_password = encrypt(req.body.password);
        const mac = req.body.mac
        const result = await knex("public.controller_password")
            .insert({mac: req.body.mac, username: encrypt_username, password: encrypt_password})
            .returning('*')
        if (mac  ==  '') {
        res.send({
            status:"UNSUCCESS",
            message:"Enter Valid Data"})
        
    } else {
        
        jwt.verify(req.token, my_secret, (err, authData) => {
            if (err) {

                res.sendStatus(403).send({
                    message:"Invalide Token"
                });

            } else {
                return res.send({
                    status:"SUCCESS",
                    message: "Create Contoller",
                    authData})
            }
        })
        
    }


    } catch (error) {

        console.error(error);
    }

})

const encrypt = (text) => {
    var cipher = crypto.createCipher(algorithm, my_secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}


router.post('/v1/authenticate', async(req, res, next) => {

    const data = req.data
    const token = jwt.sign({data}, my_secret, {
        expiresIn: '24h' // expires in 24 hours
    });
    res.send({status: 'SUCCESS', message: "Create Token", token: token})

})
function verifyToken(req, res, next) {
    const bearerHearder = req.headers['authorization']
    if (typeof bearerHearder !== 'undefined') {
        const bearer = bearerHearder.split(' ');
        const bearerToken = bearer[1]
        req.token = bearerToken;
        next()

    } else {
        res.sendStatus(403);
    }

}
module.exports = router;
