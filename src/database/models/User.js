module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        fullName: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        password: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        category_Id: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        email: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        image: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        }
    }
    let config = {
        tableName: 'users',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo (models.UserCategory, {
            as: "userCategory",
            foreingKey: "category_id"
        })
    } 


    return User;
}