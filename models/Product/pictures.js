const {Model, DataTypes} = require('sequelize');
const db = require("../../config/pool");
const Product = require("./product");

class Pictures extends Model {

}

Pictures.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'pictures',
  modelName: 'pictures',
});

Pictures.belongsTo(Product, {
  foreignKey: {
    name: 'productImgId',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'picturesProduct',
});
Product.hasMany(Pictures, {
  foreignKey: {
    name: 'productImgId',
    allowNull: false,
  },
  onUpdate: 'cascade',
  onDelete: 'cascade',
  as: 'productPictures'
});

module.exports = Pictures;
