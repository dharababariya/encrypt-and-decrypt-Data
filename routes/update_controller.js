const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const knex = require('../helpers/knex');

router.put('/v1/updatecontroller', async(req, res, next) => {
    console.log(req.body);

    const encrypt_username = encrypt(req.body.username);
    const encrypt_password = encrypt(req.body.password);
    const data = {
        input: {
            query: req.query
        }
    }

    const result = await knex("public.controller_password")
        .where('mac', data.input.query.mac)
        .update({
            mac: req.body.mac, 
            username: encrypt_username, 
            password: encrypt_password})
   
    res
        .status(201)
        .send({message: "Update Controller"})
})

const encrypt = (text) => {
    var cipher = crypto.createCipher(algorithm, my_secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

module.exports = router;
