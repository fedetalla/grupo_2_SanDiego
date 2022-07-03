module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Name: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        }
    }
    let config = {
        tableName: 'Categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany (models.Product, {
            as: "CategoryProduct",
            foreingKey: "categoryId"
        })
    } 

    return Category;
}