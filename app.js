//Import module

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');



//middleware

app.use(bodyParser.json());

//env config
dotenv.config();



//fire route

app.use(require('./routes/save_controller'));
app.use(require('./routes/get_contoller'));
app.use(require('./routes/update_controller')) ;



//Create server
app.listen(8080, () => {
    console.log('listen port 8080');
})