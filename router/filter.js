const express = require('express');
const router = express.Router();

const FilterController = require('../controllers/FilterController');

router.get("/get_home_filters", FilterController.homeFilter);
router.get("/get_car_filters", FilterController.carFilter);
router.get("/get_shop_filters", FilterController.shopFilter);

module.exports = router;
