const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const Joi = require('joi');
const algorithm = 'aes-256-ctr';
const my_secret = 'd6F3Efeq';
const knex = require('../helpers/knex')
router.get('/v1/getcontroller', async (req, res, next) => {
    try {

        const data = {
            input: {
                query: req.query
            }
        }

        const result = await knex("public.controller_password")
            .select("*").where('mac', data.input.query.mac).first()
            .returning('*');
        // console.log(result);

        const decrypt_username = decrypt(result.username);
        const decrypt_password = decrypt(result.password);
        console.log(decrypt_username,decrypt_password);



        res
            .status(201)
            .send({

               message:"Get controller"
              

            })
    } catch (error) {
        console.error(error.message)
        console.log(error)
    }
})

const decrypt = (text) => {
    var decipher = crypto.createDecipher(algorithm, my_secret)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

data_valid = async(data)=>{
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    mac: Joi.string()
})
}
module.exports = router;