module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategories';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        }
    }
    let config = {
        tableName: 'roles',
        timestamps: false
    }
    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = function (models) {
        UserCategory.belongsTo (models.User, {
            as: "user",
            foreingKey: "id"
        })
    }
    return UserCategory; 
}
