const express = require('express');
const router = express.Router();
const RateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const upload = require('../config/fileUpload');
const md5 = require('md5');

const limiter = new RateLimit({
  max: 10,
  windowMs: 15 * 60 * 1000,
  message: {
    code: 429,
    message: "Շատ հարցումներ, փորձեք կրկին 15 րոպեից:"
  }
});

const SpeedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 3,
  delayMs: 500,
  maxDelayMs: 20000,
});

const apiKeys = new Map();
apiKeys.set(md5(md5(14199077) + 'kars'), true)
const xApiKey = (req, res, next) => {
  const apiKey = req.get('X-API-KEY');
  if (apiKeys.has(apiKey)){
    next();
  } else{
    const error = new Error('Invalid API KEY');
    next(error);
  }
}

const fileUpload = upload({
  'image/webp': '.webp',
  'image/png': '.png',
  'image/jpeg': '.jpg',
},).single('avatar');

// Controllers
const UsersController = require('../controllers/Login/UsersController');
const permit = require("../middlewares/permition");

//GET
router.get('/profile', permit('user', 'admin'), UsersController.profile);
router.get('/user', xApiKey, UsersController.userData);
router.get('/all_users', permit('admin'), UsersController.allUsers);

//POST
router.post('/register', limiter, SpeedLimiter, fileUpload, xApiKey, UsersController.register);
router.post('/login', limiter, SpeedLimiter, xApiKey, UsersController.login);
router.post('/reset_password', limiter, SpeedLimiter, xApiKey, UsersController.resetPassword);

//PUT
router.put('/confirm_email', limiter, SpeedLimiter, xApiKey, UsersController.changePassword);
router.put('/user_update', permit('user', 'admin'), fileUpload, UsersController.update);

//DELETE
router.delete('/user_delete/:id', permit('user', 'admin'), UsersController.delete);

module.exports = router;
