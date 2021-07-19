const express = require('express');
const router = express.Router();

const users = require('./user')
const components = require('./components')
const categories = require('./categories')
const product = require('./product')
const contact = require('./contact')
const location = require('./location')
const filter = require('./filter')

router.use('/', users);
router.use('/', components);
router.use('/', categories);
router.use('/', product);
router.use('/', contact);
router.use('/', location);
router.use('/', filter);


module.exports = router;
