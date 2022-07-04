module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
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
        },
        price:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        description:{
            type:dataTypes.STRING(100)
        },
        category_id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        image:{
            type:dataTypes.STRING(100),
            allowNull: true
        }
        
    };
    let config = {
        tableName: "products",
        timestamps: false,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Product = sequelize.define(alias, cols, config); 

    // Product.associate = function (models){

    //     Product.belongsTo(models.Category, {
    //         as: "productCategory",
    //         foreingKey: "category_id"
    //     })
    // }  

 
    return Product;
}