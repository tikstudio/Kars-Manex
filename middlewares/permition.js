const httpError = require("http-errors");
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = process.env;

module.exports = function permit(...roles) {
  return function role(req, res, next) {
    if (req.method === 'OPTIONS'){
      next();
    }
    try {
      const {authorization} = req.headers;
      let token;
      if (authorization){
        token = authorization.replace('Bearer ', '');
      } else{
        throw httpError(403, 'Please login to view this');
      }
      const data = jwt.verify(token, JWT_SECRET);
      if (authorization && roles.includes(data.role)){
        next();
        return;
      }
      throw httpError(403, 'Forbidden');
    } catch (e) {
      next(e);
    }
  };
}
