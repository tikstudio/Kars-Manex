const homeFilter = require("../models/Filters/homeFilters");
const carFilter = require("../models/Filters/carFilters");
const shopFilter = require("../models/Filters/shopFilters");

class FilterController {

    static homeFilter = async (req, res, next) => {
        try {
            const homeFilters = await homeFilter.findAll();
            res.json({
                homeFilters
            });
        } catch (e) {
            next(e);
        }
    }
    static carFilter = async (req, res, next) => {
        try {
            const carFilters = await carFilter.findAll();
            res.json({
                carFilters
            });
        } catch (e) {
            next(e);
        }
    }
    static shopFilter = async (req, res, next) => {
        try {
            const shopFilters = await shopFilter.findAll();
            res.json({
                shopFilters
            });
        } catch (e) {
            next(e);
        }
    }

}

module.exports = FilterController;
