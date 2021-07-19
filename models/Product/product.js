const {Model, DataTypes} = require('sequelize');
const db = require("../../config/pool");
const Category = require("../../models/Categories/category");
const Category_department = require("../../models/Categories/category_department");
const Category_section = require("../../models/Categories/category_section");
const Users = require("../../models/Users/user");
const Location = require("../../models/Location/location");

class Product extends Model {

}

Product.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  p_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const image = this.getDataValue('image');
      if (image !== undefined){
        return image;
      }
      return undefined;
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  star: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  access: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize: db,
  tableName: 'products',
  modelName: 'products',
});

Product.belongsTo(Category, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'category',
});
Category.hasMany(Product, {
  foreignKey: {
    name: 'category_id',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'catProduct'
});

Product.belongsTo(Category_department, {
  foreignKey: {
    name: 'category_departmentId',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'categoryDep'
});
Category_department.hasMany(Product, {
  foreignKey: {
    name: 'category_departmentId',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Product.belongsTo(Category_section, {
  foreignKey: {
    name: 'c_section',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'categorySec'
});
Category_section.hasMany(Product, {
  foreignKey: {
    name: 'c_section',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
});

Product.belongsTo(Users, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'productsUser',
});
Users.hasMany(Product, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'products'
});

Product.belongsTo(Location, {
  foreignKey: {
    name: 'locationId',
    allowNull: true,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'productsLocate'
});
Location.hasMany(Product, {
  foreignKey: {
    name: 'locationId',
    allowNull: true,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'locationProducts'
});

module.exports = Product;
