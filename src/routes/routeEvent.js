'use strict';
// Load modules:
const   express = require('express');
const router = express.Router();

// Load controllers:
const controller = require('../controllers/controllerEvent');

//GET product:
router.get('/', controller.get);
//POST product:
router.post('/', controller.post);

module.exports = router;