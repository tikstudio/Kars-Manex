const jwt = require('jsonwebtoken');
const httpError = require('http-errors');
const {JWT_SECRET} = process.env;

const EXCLUDE = [
    ['/login', ['POST', 'GET']],
    ['/register', ['POST', 'GET']],
    ['/user_confirm', ['POST', 'GET']],
    ['/reset_password', ['POST', 'GET']],
    ['/confirm_email', ['PUT', 'GET']],
    ['/headerMenu', ['GET']],
    ['/currency', ['GET']],
    ['/allHomes', ['GET']],
    ['/allCars', ['GET']],
    ['/allProducts', ['GET']],
    ['/starProducts', ['GET']],
    ['/categories', ['GET']],
    ['/get_location', ['GET']],
    ['/get_home_filters', ['GET']],
    ['/get_car_filters', ['GET']],
    ['/get_shop_filters', ['GET']],
    ['/get_cars', ['GET']],
    ['/get_user_products', ['GET']],
    ['/user', ['GET']],
    ['/send', ['POST']],
];

function authorization(req, res, next) {
    try {
        const {authorization} = req.headers;
        const {path, method} = req;
        for (let i = 0; i < EXCLUDE.length; i++) {
            if ((EXCLUDE[i][0] === path && EXCLUDE[i][1].includes(method)) || method === 'OPTIONS') {
                next();
                return;
            }
        }
        let token;
        if (authorization) {
            token = authorization.replace('Bearer ', '');
        } else {
            throw httpError(403, 'Please login to view this');
        }
        const data = jwt.verify(token, JWT_SECRET);
        req.userId = data.userId;
        req.role = data.role;
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = authorization;
