const {Model, DataTypes} = require('sequelize');
const db = require("../../config/pool");

class Location extends Model {

}

Location.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'location',
    modelName: 'location',
});

Location.belongsTo(Location, {
    targetKey: 'id',
    foreignKey: 'regionId',
    onUpdate: 'cascade',
    onDelete: 'cascade',
    as: 'region',
});
Location.hasMany(Location, {
    targetKey: 'id',
    foreignKey: 'regionId',
    onUpdate: 'cascade',
    onDelete: 'cascade',
    as: 'city'
});

module.exports = Location;
