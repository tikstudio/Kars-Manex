const {Model, DataTypes} = require('sequelize');
const db = require("../../config/pool");
const Product = require("../../models/Product/product");

class ShopFilters extends Model {

}

ShopFilters.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    productId: {
        type: DataTypes.BIGINT.UNSIGNED,
    },

}, {
    sequelize: db,
    tableName: 'shop_filter',
    modelName: 'shop_filter',
});

ShopFilters.belongsTo(Product, {
    foreignKey: 'productId',
    onUpdate: 'cascade',
    onDelete: 'cascade',
});
Product.hasOne(ShopFilters, {
    foreignKey: 'productId',
    onUpdate: 'cascade',
    onDelete: 'cascade',
    as: 'shopFilter'
});

module.exports = ShopFilters;
