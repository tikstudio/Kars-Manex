const Location = require("../models/Location/location");
const _ = require("lodash");

class LocationController {

    static getLocation = async (req, res, next) => {
        try {
            const location = await Location.findAll({
                include: [{
                    model: Location,
                    as: 'city',
                    required: false,
                }],
            });
            const main = [];
            _.map(location, (value) => {
                if (value.id === value.regionId) {
                    main.push(value);
                }
            });
            res.json({
                location: main || [],
            });
        } catch (e) {
            next(e);
        }
    }

}

module.exports = LocationController;
