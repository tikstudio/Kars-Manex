const {Model, DataTypes} = require('sequelize');
const db = require("../../config/pool");
const Category = require("../../models/Categories/category");

class category_department extends Model {

}

category_department.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    c_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'category_department',
    modelName: 'category_department',
    timestamps: false,
});

category_department.belongsTo(Category, {
    foreignKey: {
        name: 'c_id',
        allowNull: false,
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
});
Category.hasMany(category_department, {
    foreignKey: {
        name: 'c_id',
        allowNull: false,
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
    as: 'categoryDepartments'
});


module.exports = category_department;
