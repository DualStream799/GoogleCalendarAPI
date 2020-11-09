'use strict';
// Load modules:
const   express = require('express');
const router = express.Router();

// Load controllers:
const controller = require('../controllers/controllerProduct');

//GET product:
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
//POST product:
router.post('/', controller.post);
//PUT product:
router.put('/:id', controller.put);
//DELETE product:
router.delete('/', controller.delete);

module.exports = router;