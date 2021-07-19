const HttpError = require('http-errors');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const Users = require("../../models/Users/user");
const Validate = require("../../config/validate");
const {v4: uuidv4} = require('uuid');
const transporter = require("./../../config/nodemailer");
const Product = require("../../models/Product/product");
const HomeFilter = require("../../models/Filters/homeFilters");
const CarFilter = require("../../models/Filters/carFilters");
const ShopFilter = require("../../models/Filters/shopFilters");
const Category = require("../../models/Categories/category");
const Category_department = require("../../models/Categories/category_department");
const Category_section = require("../../models/Categories/category_section");
const Location = require("../../models/Location/location");

const {JWT_SECRET, CONFIRM_URL} = process.env;

class UsersController {

  static profile = async (req, res, next) => {
    try {
      const user = await Users.findByPk(req.userId);
      res.json({
        status: "Ձեր մուտքը հաջողվել է",
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static userData = async (req, res, next) => {
    try {
      const {id} = req.query;
      const user = await Users.findOne({
        where: {id},
        attributes: {exclude: ['password', 'role', 'updatedAt', 'activation_code', 'status']},
      });
      res.json({
        status: "ok",
        user,
      });
    } catch (e) {
      next(e);
    }
  }

  static allUsers = async (req, res, next) => {
    try {
      const {s = '', sortKey = 'createdAt', sortValue = 'DESC'} = req.query;
      const users = await Users.findAll({
        where: {
          role: {$ne: 'admin'},
          $or: [
            {firstName: {$like: `%${ s }%`}},
            {lastName: {$like: `%${ s }%`}},
            {phone: {$like: `%${ s }%`}},
            {email: {$like: `%${ s }%`}},
          ],
        },
        order: [
          [sortKey, sortValue],
        ],
        include: [{
          model: Product,
          as: 'products',
          required: false,
          include: [{
            model: HomeFilter,
            as: 'homeFilter',
            required: false,
          }, {
            model: CarFilter,
            as: 'carFilter',
            required: false,
          }, {
            model: ShopFilter,
            as: 'shopFilter',
            required: false,
          }, {
            model: Category,
            as: 'category',
            required: false,
          }, {
            model: Category_department,
            as: 'categoryDep',
            required: false,
          }, {
            model: Category_section,
            as: 'categorySec',
            required: false,
          }, {
            model: Location,
            as: 'productsLocate',
            required: false,
          }, {
            model: Users,
            as: 'productsUser',
            required: false,
          }],
          subQuery: false,
        }]
      });
      res.json({
        status: "ok",
        users,
      });
    } catch (e) {
      next(e);
    }
  }

  static register = async (req, res, next) => {
    try {
      const {firstName, lastName, work, phone, email, password} = req.body;
      await Validate(req.body, {
        firstName: 'string|required|alpha|minLength:2|maxLength:20',
        lastName: 'string|required|alpha|minLength:3|maxLength:20',
        work: 'string|required|minLength:2|maxLength:20',
        phone: 'required|minLength:9|maxLength:12',
        email: 'required|email',
        password: 'required|minLength:8|maxLength:20',
      }, {phone})
      const {file} = req;

      if (phone){
        const uniquePhone = await Users.findOne({where: {phone}});
        if (uniquePhone){
          res.status(422).json({errors: {phone: "Այս համարը արդեն գոյություն ունի"}});
          return;
        }
      }
      const uniqueEmail = await Users.findOne({where: {email}})
      if (uniqueEmail){
        res.status(422).json({errors: {email: "Այս Էլ․ փոստը արդեն գոյություն ունի"}});
        return;
      }
      const user = await Users.create({
        firstName, lastName, work, email, phone, password
      });
      const fileTypes = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/webp': '.webp'
      }

      if (file){
        const imageDir = `public/avatars/${ user.id }/`;
        if (!fs.existsSync(imageDir)){
          fs.mkdirSync(imageDir, {recursive: true})
        }
        const avatar = file.fieldname + '-' + Date.now() + fileTypes[file.mimetype];
        fs.writeFileSync(imageDir + avatar, file.buffer);

        user.avatar = avatar;
        await user.save();
      }
      res.json({
        status: 'registered',
        result: user,
      });
    } catch (e) {
      next(e);
    }
  }

  static login = async (req, res, next) => {
    try {
      await Validate(req.body, {
        email: 'required|email',
        remember: 'boolean',
        password: 'required|minLength:8|maxLength:20',
      })
      const {email, password, remember} = req.body;
      const user = await Users.findOne({
        where: {
          email,
        }
      });

      if (!user || user.getDataValue('password') !== Users.passwordHash(password)){
        throw HttpError(403, 'invalid email or password');
      }

      const token = jwt.sign({userId: user.id, role: user.getDataValue('role')}, JWT_SECRET);
      if (user.getDataValue('role') === 'admin'){
        res.json({
          role: 'admin',
          token,
          remember,
        });
        return;
      }

      res.json({
        status: 'ok',
        token,
        remember,
      });
    } catch (e) {
      next(e);
    }
  }

  static resetPassword = async (req, res, next) => {
    try {
      await Validate(req.body, {
        email: 'required|email',
      });
      const {email} = req.body;
      const user = await Users.findOne({
        where: {
          email,
        },
      });
      if (user){
        const activationCode = uuidv4();
        await Users.update({
          activation_code: activationCode,
          status: 'pending',
        }, {
          where: {
            email,
          },
        });
        const confInfo = `
                <div style="width: 80%;height:100%;margin: 0 auto;color: black;">
                    <div style="width: 100%;height: 80px;font-weight: bold;font-size: 50px;text-align: center;
                    background: black;color: #ba0101; margin-bottom: 20px;font-family: monospace;">Kars&Manex</div>
                    <h1 style="margin: 0 0 50px 0;text-align: center;">Բարի գալուստ մեր կայք</h1>
                    <strong style="margin: 0 0 10px 100px">Ողջու՜յն ${ user.firstName } ${ user.lastName }</strong>
                    <p style="word-break: break-word;margin: 0 0 50px 100px">
                    Վերջերս խնդրել եք վերականգնել Ձեր Kars&Manex հաշվի գաղտնաբառը։</p>
                    <a href="mailto:${ email }" style="display:block;word-break: break-word;text-align: center;
                    margin: 0 0 30px 0">${ email }</a>
                    <p style="word-break: break-word;margin: 0 0 30px 0;text-align: center;">
                    Ձեր գաղտնաբառը թարմացնելու համար սեղմեք ներքևի կոճակը։</p>
                    <a style="width: 150px;padding: 8px 20px;background: #3572b0;font-weight: bold;
                    text-align: center;color:white;margin: 0 auto 30px;display: block;
                    border-radius: 5px;word-break: break-word;text-decoration: none;"
                     href="${ CONFIRM_URL + activationCode }">Հաստատեք Ձեր էլ․ Փոստը </a>
                     <i style="margin: 0 0 10px 100px;display: block">Հարգանքներով</i>
                     <strong style="margin: 0 0 0 100px">Kars&Manex Թիմ</strong>
                </div>
            `;
        await transporter.sendMail({
          from: '"Kars&Manex" <karsmanex.contact@mail.ru>',
          to: email,
          subject: 'Kars&Manex - Email Confirmation',
          text: `Բարեւ ${ user.firstName }`,
          html: confInfo,
        });
        res.json({
          status: 'Ձեզ ուղարկվել է էլ․ նամակ',
          status1: 'Խնդրում ենք հաստատել ձեր էլ․Հասցեն',
        });
      } else{
        res.json({
          errors: 'Նման օգտատեր չկա',
        });
      }
    } catch (e) {
      next(e);
    }
  }

  static changePassword = async (req, res, next) => {
    try {
      await Validate(req.body, {
        activationCode: 'required',
        password: 'required|minLength:8|maxLength:20',
      });
      const {activationCode, password} = req.body;
      const user = await Users.findOne({
        where: {
          activation_code: activationCode,
        },
      });
      if (user){
        if (user.getDataValue('status') === 'activated'){
          const err = {errors: 'Ձեր գաղտնաբառը արդեն փոխվել է'}
          throw HttpError(403, err);
        }
        await Users.update({
          password,
          status: 'activated',
        }, {
          where: {
            id: user.id,
          },
        });
        res.json({
          status: 'Ok',
          msg: 'Ձեր գաղտնաբառը փոխվել է',
        });
        return;
      }
      res.json({
        errors: 'Նման օգտատեր չկա: Նորից փորձեք:',
      });
    } catch (e) {
      next(e);
    }
  }

  static update = async (req, res, next) => {
    try {
      const {id, firstName, lastName, work, phone, email,} = req.body;

      await Validate(req.body, {
        firstName: 'string|alpha|minLength:2|maxLength:20',
        lastName: 'string|alpha|minLength:3|maxLength:20',
        work: 'string|minLength:2|maxLength:20',
        phone: 'minLength:9|maxLength:12',
        email: 'email',
      }, {phone});

      let e;
      let p;
      if (email){
        const uniqueEmail = await Users.findOne({where: {email}});
        if (!uniqueEmail){
          e = await Users.update({
            email
          }, {
            where: {
              id,
            },
          });
        }
      }
      if (phone){
        const uniquePhone = await Users.findOne({where: {phone}});
        if (!uniquePhone){
          p = await Users.update({
            phone
          }, {
            where: {
              id,
            },
          });
        }
      }
      const {file} = req;
      let avatar;
      if (file){
        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/webp': '.webp'
        }

        const imageDir = `public/avatars/${ id }/`;
        if (!fs.existsSync(imageDir)){
          fs.mkdirSync(imageDir, {recursive: true})
        }
        const newAvatar = file.fieldname + '-' + Date.now() + fileTypes[file.mimetype];
        fs.writeFileSync(imageDir + newAvatar, file.buffer);
        avatar = newAvatar
      }
      const user = await Users.update({
        firstName, lastName, work, avatar
      }, {
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        msg: 'Updated',
        result: user,
        e: e ? e : [0],
        p: p ? p : [0],
      });
    } catch (e) {
      next(e);
    }
  }

  static delete = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
      });
      const {id} = req.params;
      const user = await Users.destroy({
        where: {
          id,
        },
        limit: 1,
      });

      const imageDir = `public/avatars/${ id }/`;

      if (fs.existsSync(imageDir)){
        fs.rmdirSync(imageDir, {recursive: true});
      }

      res.json({
        status: 'ok',
        msg: 'Deleted',
        result: user,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UsersController;
