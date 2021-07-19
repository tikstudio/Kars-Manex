const {Model, DataTypes} = require('sequelize');
const db = require("../../config/pool");
const Category_department = require("../../models/Categories/category_department");

class category_section extends Model {

}

category_section.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'category_section',
    modelName: 'category_section',
    timestamps: false,
});
category_section.belongsTo(Category_department, {
    foreignKey: {
        name: 'category_id',
        allowNull: false,
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
});

Category_department.hasMany(category_section, {
    foreignKey: {
        name: 'category_id',
        allowNull: false,
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
    as: 'categorySections'
});

module.exports = category_section;
