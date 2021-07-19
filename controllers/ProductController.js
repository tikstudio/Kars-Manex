const fs = require("fs");
const _ = require("lodash");
const Promise = require('bluebird');
const Product = require("../models/Product/product");
const Users = require("../models/Users/user");
const HomeFilter = require("../models/Filters/homeFilters");
const CarFilter = require("../models/Filters/carFilters");
const ShopFilter = require("../models/Filters/shopFilters");
const Category = require("../models/Categories/category");
const Category_department = require("../models/Categories/category_department");
const Category_section = require("../models/Categories/category_section");
const Location = require("../models/Location/location");
const Cars = require("../models/Product/cars");
const Validate = require("../config/validate");
const sharp = require("sharp");
const Pictures = require("../models/Product/pictures");

class ProductController {

  static getAllHomes = async (req, res, next) => {
    try {
      const maxPrice = await Product.max('price');
      const maxFloor = await HomeFilter.max('floor');
      const maxArea = await HomeFilter.max('area');
      let {
        search = '', sortKey = 'createdAt', sortValue = 'DESC', category_departmentId, c_section,
        location, address, priceMin = 0, priceMax = maxPrice, building_type, new_built,
        floorMin, floorMax, room_numbers, bathRoom_numbers, areaMin, areaMax, payment, renovation,
      } = req.query;
      let filter = {};
      if (category_departmentId){
        filter.category_departmentId = category_departmentId
      }
      if (c_section){
        filter.c_section = c_section
      }
      if (location){
        filter.locationId = location
      }
      if (address){
        filter.address = {$like: `%${ address }%`}
      }
      if (!priceMax){
        priceMax = maxPrice
      }
      if (priceMin || priceMax){
        filter.price = {$between: [priceMin, priceMax]}
      }
      let homeFilter = {};
      if (building_type){
        homeFilter['$homeFilter.building_type$'] = building_type;
      }
      if (new_built){
        homeFilter['$homeFilter.new_built$'] = new_built;
      }
      if (floorMin || floorMax){
        if (!floorMin){
          floorMin = 0;
        }
        if (!floorMax){
          floorMax = maxFloor;
        }
        homeFilter['$homeFilter.floor$'] = {$between: [floorMin, floorMax]};
      }
      if (room_numbers){
        homeFilter['$homeFilter.room_numbers$'] = room_numbers;
      }
      if (bathRoom_numbers){
        homeFilter['$homeFilter.bathRoom_numbers$'] = bathRoom_numbers;
      }
      if (areaMin || areaMax){
        if (!areaMin){
          areaMin = 0;
        }
        if (!areaMax){
          areaMax = maxArea;
        }
        homeFilter['$homeFilter.area$'] = {$between: [areaMin, areaMax]};
      }
      if (payment){
        homeFilter['$homeFilter.payment$'] = payment;
      }
      if (renovation){
        homeFilter['$homeFilter.renovation$'] = renovation;
      }
      const product = await Product.findAll({
        where: [{
          $and: [
            {access: true},
            {category_id: 1},
            filter,
            homeFilter,
            {
              $or: [
                {p_name: {$like: `${ search }%`}},
                {address: {$like: `${ search }%`}},
                {locationId: {$like: `${ search }%`}},
                {price: {$like: `${ search }%`}},
              ]
            }
          ]
        }],
        include: [{
          model: HomeFilter,
          as: 'homeFilter',
          required: false,
        }, {
          model: Category,
          as: 'category',
          required: false,
        }, {
          model: Pictures,
          as: 'productPictures',
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
          attributes: ['id', 'firstName', 'lastName', 'phone', 'work', 'avatar'],
        }],
        subQuery: false,
        order: [
          [sortKey, sortValue],
        ],
      });
      res.json({
        product
      });
    } catch (e) {
      next(e);
    }
  }
  static getAllCars = async (req, res, next) => {
    try {
      const maxPrice = await Product.max('price');
      const maxBYear = await CarFilter.max('bYear');
      const maxRun = await CarFilter.max('run');
      const maxHorsepower = await CarFilter.max('horsepower');
      const maxMotorVolume = await CarFilter.max('motorVolume');
      let {
        search = '', sortKey = 'createdAt', sortValue = 'DESC', category_departmentId, c_section,
        location, address, priceMin = 0, priceMax = maxPrice, brand, model, bodyType, bYearMin, bYearMax,
        runMin, runMax, horsepowerMin, horsepowerMax, motor, motorVolumeMin,
        motorVolumeMax, transmission, traction, color, wheel, customsCleared
      } = req.query;
      let filter = {};
      if (category_departmentId){
        filter.category_departmentId = category_departmentId
      }
      if (c_section){
        filter.c_section = c_section
      }
      if (location){
        filter.locationId = location
      }
      if (address){
        filter.address = {$like: `%${ address }%`}
      }
      if (!priceMax){
        priceMax = maxPrice
      }
      if (priceMin || priceMax){
        filter.price = {$between: [priceMin, priceMax]}
      }
      let carFilter = {};
      if (brand){
        carFilter['$carFilter.brand$'] = brand;
      }
      if (model){
        carFilter['$carFilter.model$'] = model;
      }
      if (bodyType){
        carFilter['$carFilter.bodyType$'] = bodyType;
      }
      if (bYearMin || bYearMax){
        if (!bYearMin){
          bYearMin = 0;
        }
        if (!bYearMax){
          bYearMax = maxBYear;
        }
        carFilter['$carFilter.bYear$'] = {$between: [bYearMin, bYearMax]};
      }
      if (runMin || runMax){
        if (!runMin){
          runMin = 0;
        }
        if (!runMax){
          runMax = maxRun;
        }
        carFilter['$carFilter.run$'] = {$between: [runMin, runMax]};
      }
      if (horsepowerMin || horsepowerMax){
        if (!horsepowerMin){
          horsepowerMin = 0;
        }
        if (!horsepowerMax){
          horsepowerMax = maxHorsepower;
        }
        carFilter['$carFilter.horsepower$'] = {$between: [horsepowerMin, horsepowerMax]};
      }
      if (motor){
        carFilter['$carFilter.motor$'] = motor;
      }
      if (motorVolumeMin || motorVolumeMax){
        if (!motorVolumeMin){
          motorVolumeMin = 0;
        }
        if (!motorVolumeMax){
          motorVolumeMax = maxMotorVolume;
        }
        carFilter['$carFilter.motorVolume$'] = {$between: [motorVolumeMin, motorVolumeMax]};
      }
      if (transmission){
        carFilter['$carFilter.transmission$'] = transmission;
      }
      if (traction){
        carFilter['$carFilter.traction$'] = traction;
      }
      if (color){
        carFilter['$carFilter.color$'] = color;
      }
      if (wheel){
        carFilter['$carFilter.wheel$'] = wheel;
      }
      if (customsCleared){
        carFilter['$carFilter.customsCleared$'] = customsCleared;
      }
      const product = await Product.findAll({
        where: [{
          $and: [
            {access: true},
            {category_id: 2},
            filter,
            carFilter,
            {
              $or: [
                {p_name: {$like: `${ search }%`}},
                {address: {$like: `${ search }%`}},
                {locationId: {$like: `${ search }%`}},
                {price: {$like: `${ search }%`}},
                {'$carFilter.brand$': {$like: `${ brand }%`}},
                {'$carFilter.model$': {$like: `${ model }%`}},
                {'$carFilter.bodyType$': {$like: `${ bodyType }%`}},
              ]
            }
          ]
        }],
        include: [{
          model: CarFilter,
          as: 'carFilter',
          required: false,
        }, {
          model: Pictures,
          as: 'productPictures',
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
          attributes: ['id', 'firstName', 'lastName', 'phone', 'work', 'avatar'],
        }],
        subQuery: false,
        order: [
          [sortKey, sortValue],
        ],
      });
      res.json({
        product
      });
    } catch (e) {
      next(e);
    }
  }
  static getStaredProduct = async (req, res, next) => {
    try {
      const product = await Product.findAll({
        include: [{
          model: HomeFilter,
          as: 'homeFilter',
          required: false,
        }, {
          model: CarFilter,
          as: 'carFilter',
          required: false,
        }, {
          model: Pictures,
          as: 'productPictures',
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
          model: Users,
          as: 'productsUser',
          required: false,
          attributes: ['id', 'firstName', 'lastName', 'phone', 'work', 'avatar']
        }],
        where: [{
          $and: [
            {star: true},
            {access: true},
          ]
        }],
        order: [
          ['updatedAt', 'DESC'],
        ],
      });
      res.json({
        product
      });
    } catch (e) {
      next(e);
    }
  }
  static getUserProducts = async (req, res, next) => {
    try {
      const {
        search = '', user_id, sortKey = 'createdAt', sortValue = 'DESC',
        category_id, category_departmentId, c_section,
      } = req.query;
      let filter = {};
      if (user_id){
        filter.user_id = user_id
      }
      if (category_id){
        filter.category_id = category_id
      }
      if (category_departmentId){
        filter.category_departmentId = category_departmentId
      }
      if (c_section){
        filter.c_section = c_section
      }
      const product = await Product.findAll({
        where: [{
          $and: [
            {access: true},
            filter,
            {
              $or: [
                {p_name: {$like: `${ search }%`}},
                {address: {$like: `${ search }%`}},
                {locationId: {$like: `${ search }%`}},
                {price: {$like: `${ search }%`}},
              ]
            }
          ]
        }],
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
          model: Pictures,
          as: 'productPictures',
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
          attributes: ['id', 'firstName', 'lastName', 'phone', 'work', 'avatar'],
        }],
        subQuery: false,
        order: [
          [sortKey, sortValue],
        ],
      });
      res.json({
        products: product || [],
      });
    } catch (e) {
      next(e);
    }
  }
  static getAllProducts = async (req, res, next) => {
    try {
      const {
        search = '', user_id, sortKey = 'createdAt', sortValue = 'DESC',
        category_id, category_departmentId, c_section,
      } = req.query;
      let filter = {};
      if (category_id){
        filter.category_id = category_id
      }
      if (category_departmentId){
        filter.category_departmentId = category_departmentId
      }
      if (c_section){
        filter.c_section = c_section
      }
      const product = await Product.findAll({
        where: [{
          $and: [
            {access: true},
            {user_id: user_id ? user_id : req.userId},
            filter,
            {
              $or: [
                {p_name: {$like: `${ search }%`}},
                {address: {$like: `${ search }%`}},
                {locationId: {$like: `${ search }%`}},
                {price: {$like: `${ search }%`}},
              ]
            }
          ]
        }],
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
          model: Pictures,
          as: 'productPictures',
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
        order: [
          [sortKey, sortValue],
        ],
      });
      res.json({
        products: product || [],
      });
    } catch (e) {
      next(e);
    }
  }
  static getNewProducts = async (req, res, next) => {
    try {
      const {
        search = '', sortKey = 'createdAt', sortValue = 'DESC',
        category_id, category_departmentId, c_section,
      } = req.query;
      let filter = {};
      if (category_id){
        filter.category_id = category_id
      }
      if (category_departmentId){
        filter.category_departmentId = category_departmentId
      }
      if (c_section){
        filter.c_section = c_section
      }
      const product = await Product.findAll({
        where: [{
          $and: [
            {access: false},
            filter,
            {
              $or: [
                {p_name: {$like: `${ search }%`}},
                {address: {$like: `${ search }%`}},
                {locationId: {$like: `${ search }%`}},
                {price: {$like: `${ search }%`}},
              ]
            }
          ]
        }],
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
          model: Pictures,
          as: 'productPictures',
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
        order: [
          [sortKey, sortValue],
        ],
      });
      res.json({
        products: product || [],
      });
    } catch (e) {
      next(e);
    }
  }
  static getCars = async (req, res, next) => {
    try {
      const {Make, Model} = req.query;
      let modelFilter = {};
      let categoryFilter = {};
      if (Make){
        modelFilter.Make = Make
      }
      if (Model){
        categoryFilter.Model = Model
      }
      const Makes = await Cars.findAll({
        attributes: ['id', 'Make'],
        order: [
          ['Make', 'ASC'],
        ],
      });
      const Models = await Cars.findAll({
        where: [modelFilter],
        attributes: ['id', 'Model', 'Year'],
        order: [
          ['Model', 'ASC'],
          ['Year', 'ASC'],
        ],
      });
      const Category = await Cars.findAll({
        where: [categoryFilter],
        attributes: ['id', 'Category'],
        order: [
          ['Category', 'ASC'],
        ],
      });
      res.json({
        makes: _.uniqBy(Makes, 'Make') || [],
        model: _.uniqBy(Models, 'Model') || [],
        category: _.uniqBy(Category, 'Category') || [],
      });
    } catch (e) {
      next(e);
    }
  }

  static postHome = async (req, res, next) => {
    try {
      const {
        p_name, address, phone, price, email, description, location,
        category_id, category_departmentId, c_section,
        building_type, new_built, floor, room_numbers,
        bathRoom_numbers, area, renovation, payment
      } = req.body;
      const {files} = req;

      await Validate(req.body, {
        p_name: 'required|string', address: 'required|string',
        phone: 'required|string|minLength:9|maxLength:12', price: 'required|integer',
        email: 'email', description: 'required|string', location: 'required|integer',
        category_id: 'required|integer', category_departmentId: 'required|integer',
        c_section: 'required|integer',
        building_type: 'string', payment: 'required|string', floor: 'integer',
        room_numbers: 'string', bathRoom_numbers: 'string', area: 'string', renovation: 'string',
        new_built: 'boolean',
      }, {phone, files});

      const product = await Product.create({
        p_name, address, phone, price, email, description, locationId: location,
        category_id, category_departmentId, c_section, user_id: req.userId,
      });

      const homeFilter = await HomeFilter.create({
        productId: product.id, building_type, new_built, floor, room_numbers,
        bathRoom_numbers, area, renovation, payment,
      });

      if (files){
        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/webp': '.webp'
        }
        const imageDir = `public/uploads/${ product.id }/`;
        if (!fs.existsSync(imageDir)){
          fs.mkdirSync(imageDir, {recursive: true})
        }

        await Promise.map(req.files, async (p) => {
          const p_pictures = p.fieldname + '-' + Date.now() + fileTypes['image/png'];
          await sharp(p.buffer)
            .resize(1000, 1000, {
              fit: 'cover',
            })
            .toFormat('png')
            .toFile(imageDir + p_pictures);
          if (p.fieldname === 'image'){
            product.image = `${ global.serverUrl }/uploads/${ product.id }/${ p_pictures }`;
          }
          await Pictures.create({
            productImgId: product.id,
            link: `${ global.serverUrl }/uploads/${ product.id }/${ p_pictures }`,
          });
        })

        await product.save();
      }

      res.json({
        status: 'ok',
        msg: 'Հայտարարությունը հաջողությամբ ստեղծվել է',
        result: product,
        result2: homeFilter,
      });
    } catch (e) {
      next(e);
    }
  }
  static postCar = async (req, res, next) => {
    try {
      const {
        p_name, address, phone, price, email, description, location,
        category_id, category_departmentId, c_section,
        brand, model, bYear, bodyType, run, horsepower, motor, motorVolume,
        transmission, traction, color, wheel, customsCleared,
      } = req.body;
      const {files} = req;

      await Validate(req.body, {
        p_name: 'required|string', address: 'required|string',
        phone: 'required|string|minLength:9|maxLength:12', price: 'required|integer',
        email: 'email', description: 'required|string', location: 'required|integer',
        category_id: 'required|integer', category_departmentId: 'required|integer', c_section: 'required|integer',
        brand: 'string', model: 'string', bYear: 'string', bodyType: 'string',
        run: 'string', horsepower: 'string', motor: 'string', motorVolume: 'string',
        transmission: 'string', traction: 'string', color: 'string',
        wheel: 'string', customsCleared: 'boolean',
      }, {phone, files});

      const product = await Product.create({
        p_name, address, phone, price, email, description, locationId: location,
        category_id, category_departmentId, c_section, user_id: req.userId,
      });

      const carFilter = await CarFilter.create({
        productId: product.id, brand, model, bYear, bodyType, run, horsepower, motor,
        motorVolume, transmission, traction, color, wheel, customsCleared,
      });

      if (files){
        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/webp': '.webp'
        }
        const imageDir = `public/uploads/${ product.id }/`;
        if (!fs.existsSync(imageDir)){
          fs.mkdirSync(imageDir, {recursive: true})
        }

        await Promise.map(req.files, async (p) => {
          const p_pictures = p.fieldname + '-' + Date.now() + fileTypes['image/png'];
          await sharp(p.buffer)
            .resize(1000, 1000, {
              fit: 'cover',
            })
            .toFormat('png')
            .toFile(imageDir + p_pictures);
          if (p.fieldname === 'image'){
            product.image = `${ global.serverUrl }/uploads/${ product.id }/${ p_pictures }`;
          }
          await Pictures.create({
            productImgId: product.id,
            link: `${ global.serverUrl }/uploads/${ product.id }/${ p_pictures }`,
          });
        })

        await product.save();
      }

      res.json({
        status: 'ok',
        msg: 'Հայտարարությունը հաջողությամբ ստեղծվել է',
        result: product,
        result2: carFilter,
      });
    } catch (e) {
      next(e);
    }
  }

  static updateHome = async (req, res, next) => {
    try {
      const {
        id, p_name, address, phone, price, email, description, location,
        building_type, new_built, floor, room_numbers,
        bathRoom_numbers, area, renovation, payment, oldImage
      } = req.body;
      const {files} = req;

      await Validate(req.body, {
        id: 'required|integer', p_name: 'string', address: 'string',
        phone: 'string|minLength:9|maxLength:12', price: 'integer',
        email: 'email', description: 'string', location: 'integer',
        building_type: 'string', payment: 'string', floor: 'integer',
        room_numbers: 'string', bathRoom_numbers: 'string', area: 'string', renovation: 'string',
        new_built: 'boolean',
      }, {phone, files});

      let mainImage;
      let pic = '';
      if (files){
        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/webp': '.webp'
        }
        const imageDir = `public/uploads/${ id }/`;
        if (!fs.existsSync(imageDir)){
          fs.mkdirSync(imageDir, {recursive: true})
        }

        await Promise.map(req.files, async (p) => {
          const p_pictures = p.fieldname + '-' + Date.now() + fileTypes['image/png'];
          await sharp(p.buffer)
            .resize(1000, 1000, {
              fit: 'cover',
            })
            .toFormat('png')
            .toFile(imageDir + p_pictures);
          if (p.fieldname === 'image'){
            mainImage = `${ global.serverUrl }/uploads/${ id }/${ p_pictures }`;
            const picture = await Pictures.findOne({
              link: oldImage || '',
            })
            if (picture){
              await Pictures.destroy({
                where: {
                  link: oldImage,
                },
                limit: 1,
              });
            }
          }
          pic = await Pictures.create({
            productImgId: id,
            link: `${ global.serverUrl }/uploads/${ id }/${ p_pictures }`,
          });
        })
      }

      const product = await Product.update({
        p_name, address, phone, price, email, description, locationId: location, image: mainImage,
      }, {
        where: {
          id
        }
      });

      const homeFilter = await HomeFilter.update({
        building_type, new_built, floor, room_numbers,
        bathRoom_numbers, area, renovation, payment,
      }, {
        where: {
          productId: id
        }
      });

      res.json({
        status: 'ok',
        msg: 'Հայտարարությունը հաջողությամբ թարմացվել է',
        result: product,
        result2: homeFilter,
        result3: pic,
      });
    } catch (e) {
      next(e);
    }
  }
  static updateCar = async (req, res, next) => {
    try {
      const {
        id, p_name, address, phone, price, email, description, location,
        brand, model, bYear, bodyType, run, horsepower, motor, motorVolume,
        transmission, traction, color, wheel, customsCleared, oldImage
      } = req.body;
      const {files} = req;

      await Validate(req.body, {
        id: 'required|integer', p_name: 'string', address: 'string',
        phone: 'string|minLength:9|maxLength:12', price: 'integer',
        email: 'email', description: 'string', location: 'integer',
        brand: 'string', model: 'string', bYear: 'string',
        bodyType: 'string', run: 'string', horsepower: 'string', motor: 'string',
        motorVolume: 'string', transmission: 'string', traction: 'string', color: 'string',
        wheel: 'string', customsCleared: 'boolean',
      }, {phone, files});

      let mainImage;
      let pic = '';
      if (files){
        const fileTypes = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/webp': '.webp'
        }
        const imageDir = `public/uploads/${ id }/`;
        if (!fs.existsSync(imageDir)){
          fs.mkdirSync(imageDir, {recursive: true})
        }

        await Promise.map(req.files, async (p) => {
          const p_pictures = p.fieldname + '-' + Date.now() + fileTypes['image/png'];
          await sharp(p.buffer)
            .resize(1000, 1000, {
              fit: 'cover',
            })
            .toFormat('png')
            .toFile(imageDir + p_pictures);
          if (p.fieldname === 'image'){
            mainImage = `${ global.serverUrl }/uploads/${ id }/${ p_pictures }`;
            const picture = await Pictures.findOne({
              link: oldImage || '',
            })
            if (picture){
              await Pictures.destroy({
                where: {
                  link: oldImage,
                },
                limit: 1,
              });
            }
          }
          pic = await Pictures.create({
            productImgId: id,
            link: `${ global.serverUrl }/uploads/${ id }/${ p_pictures }`,
          });
        })
      }

      const product = await Product.update({
        p_name, address, phone, price, email, description, locationId: location, image: mainImage,
      }, {
        where: {
          id
        }
      });

      const carFilter = await CarFilter.update({
        brand, model, bYear, bodyType, run, horsepower, motor,
        motorVolume, transmission, traction, color, wheel, customsCleared,
      }, {
        where: {
          productId: id
        }
      });

      res.json({
        status: 'ok',
        msg: 'Հայտարարությունը հաջողությամբ թարմացվել է',
        result: product,
        result2: carFilter,
        result3: pic,
      });
    } catch (e) {
      next(e);
    }
  }
  static updateAccess = async (req, res, next) => {
    try {
      await Validate(req.body, {
        id: 'required|integer',
        access: 'boolean',
        star: 'boolean',
      });
      const {id, access, star} = req.body;

      let status = {};
      if (access || access === false){
        status.access = access
      }
      if (star || star === false){
        status.star = star
      }

      const product = await Product.update(status, {
        where: {
          id,
        },
      });

      res.json({
        status: 'ok',
        result: access === false ? [0] : product,
        access: access === false ? true : null,
      });
    } catch (e) {
      next(e);
    }
  }

  static deleteImage = async (req, res, next) => {
    try {
      await Validate(req.params, {
        id: 'required|integer',
      });
      const {id} = req.params;
      const pictures = await Pictures.destroy({
        where: {
          id,
        },
        limit: 1,
      });

      const imageDir = `public/uploads/${ id }/`;

      if (fs.existsSync(imageDir)){
        fs.rmdirSync(imageDir, {recursive: true});
      }

      res.json({
        status: 'ok',
        msg: 'Deleted',
        result: pictures,
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
      const product = await Product.destroy({
        where: {
          id,
        },
        limit: 1,
      });

      await Pictures.destroy({
        where: {
          productImgId: id,
        },
      });

      const imageDir = `public/uploads/${ id }/`;

      if (fs.existsSync(imageDir)){
        fs.rmdirSync(imageDir, {recursive: true});
      }

      res.json({
        status: 'ok',
        msg: 'Deleted',
        result: product,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = ProductController;
