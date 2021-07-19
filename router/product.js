const express = require('express');
const router = express.Router();

const upload = require('../config/fileUpload');

const fileUpload = upload(
  {
    'image/webp': '.webp',
    'image/png': '.png',
    'image/jpeg': '.jpg',
  },
).any();

//Controllers
const ProductController = require('../controllers/ProductController');
const permit = require("../middlewares/permition");

//GET
router.get("/allHomes", ProductController.getAllHomes);
router.get("/allCars", ProductController.getAllCars);
router.get("/starProducts", ProductController.getStaredProduct);
router.get("/get_user_products", ProductController.getUserProducts);
router.get("/get_my_products", permit('user', 'admin'), ProductController.getAllProducts);
router.get("/get_new_products", permit('admin'), ProductController.getNewProducts);
router.get("/get_cars", ProductController.getCars);

//POST
router.post("/create_home", permit('user', 'admin'), fileUpload, ProductController.postHome);
router.post("/create_car", permit('user', 'admin'), fileUpload, ProductController.postCar);

//PUT
router.put("/update_home", permit('user', 'admin'), fileUpload, ProductController.updateHome);
router.put("/update_car", permit('user', 'admin'), fileUpload, ProductController.updateCar);
router.put("/update_access", permit('admin'), ProductController.updateAccess);

//DELETE
router.delete("/delete_product_image/:id", permit('user', 'admin'), ProductController.deleteImage);
router.delete("/delete_product/:id", permit('user', 'admin'), ProductController.delete);

module.exports = router;
