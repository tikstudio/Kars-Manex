const {Model, DataTypes} = require('sequelize');
const db = require("../../config/pool");

class Cars extends Model {

}

Cars.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    objectId : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'objectId',
    },
    Year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Make: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Model: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'cars',
    modelName: 'cars',
});

module.exports = Cars;
