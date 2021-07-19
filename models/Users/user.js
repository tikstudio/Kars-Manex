const {Model, DataTypes} = require('sequelize');
const md5 = require('md5');
const db = require("../../config/pool");

class Users extends Model {

    static passwordHash = (pass) => {
        return md5(md5(pass + '_test'))
    }

}

Users.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    work: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'phone',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'email',
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('password', Users.passwordHash(val))
        },
        get() {
            return undefined;
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        get() {
            return undefined;
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            const userId = this.getDataValue('id');
            const avatar = this.getDataValue('avatar');
            if (avatar) {
                return `${global.serverUrl}/avatars/${userId}/${avatar}`;
            }
            return undefined;
        }
    },
    activation_code: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: 'active_code',
        expires: 3600 * 1000,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending',
    },
}, {
    sequelize: db,
    tableName: 'users',
    modelName: 'users',
});

module.exports = Users;
