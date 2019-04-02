const express = require('express');
const router = express.Router();
const crypto = require('crypto');


const knex = require('../helpers/knex');

router.post('/v1/savecontroller', async(req, res, next) => {
    try {

        const encrypt_username = encrypt(req.body.username);
        const encrypt_password = encrypt(req.body.password);

        const result = await knex("public.controller_password")
            .insert({mac: req.body.mac, username: encrypt_username, password: encrypt_password})
            .returning('*');
        console.log(result);
        res
            .status(201)
            .send({message: "Create Contoller"})
    } catch (error) {
        console.error(error.message);
    }
})

const encrypt = (text) => {
    var cipher = crypto.createCipher(algorithm, my_secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

module.exports = router;
