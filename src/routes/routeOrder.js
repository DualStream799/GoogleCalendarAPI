'use strict';
// Load modules:
const   express = require('express');
const router = express.Router();

// Load controllers:
const controller = require('../controllers/controllerOrder');

//POST product:
router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;