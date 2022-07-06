module.exports = (sequelize, dataTypes) => {
    let alias = 'UserCategory';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        tableName: 'roles',
        timestamps: false
    }
    const UserCategory = sequelize.define(alias, cols, config);

    UserCategory.associate = function (models) {
        UserCategory.hasMany(models.User, {
            as: "user",
            foreignKey: "id"
        })
    }
    return UserCategory; 
}
