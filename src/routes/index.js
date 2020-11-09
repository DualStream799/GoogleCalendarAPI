'use strict';

const   express = require('express');
const router = express.Router();

//GET index:
const getIndex = router.get('/', (req, res, next) => {
    res.status(200).send({ 
        title:"Node Google Calendar API",
        version: "0.0.3"
    });
});

module.exports = getIndex;