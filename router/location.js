const express = require('express');
const router = express.Router();

const LocationController = require('../controllers/LocationController');

router.get("/get_location", LocationController.getLocation);

module.exports = router;
