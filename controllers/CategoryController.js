const Category = require("../models/Categories/category");
const Category_department = require("../models/Categories/category_department");
const Category_section = require("../models/Categories/category_section");

class CategoryController {

  static index = async (req, res, next) => {
    try {
      const {id, category_id} = req.query;
      const category = await Category.findAll();
      const categoryDep = await Category_department.findAll({
        where: {
          c_id: +id,
        },
      });
      const categorySec = await Category_section.findAll({
        where: {
          category_id: +category_id,
        },
      });
      res.json({
        category: category || [],
        categoryDep: categoryDep || [],
        categorySec: categorySec || [],
      });
    } catch (e) {
      next(e);
    }
  }

}

module.exports = CategoryController;
