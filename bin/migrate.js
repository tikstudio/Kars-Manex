const Users = require("../models/Users/user");
const Product = require("../models/Product/product");
const Cars = require("../models/Product/cars");
const Pictures = require("../models/Product/pictures");
const Category = require("../models/Categories/category");
const Category_department = require("../models/Categories/category_department");
const Category_section = require("../models/Categories/category_section");
const Location = require("../models/Location/location");
const Converter = require("../models/Converter/converter_rate");
const Menus = require("../models/Menus/header_menu");
const HomeFilters = require("../models/Filters/homeFilters");
const CarFilters = require("../models/Filters/carFilters");
const ShopFilters = require("../models/Filters/shopFilters");

async function main() {
  const models = [
    Users,
    Menus,
    Category,
    Category_department,
    Category_section,
    Location,
    Product,
    Cars,
    Converter,
    HomeFilters,
    CarFilters,
    ShopFilters,
    Pictures,
  ]
  for ( const i in models ){
    console.log('--->', i)
    await models[i].sync({alter: true});
  }
  process.exit();
}

main().then(r => console.log(r-- > 'Done')).catch(e => console.log(e));
