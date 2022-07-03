module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
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
        },
        price:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        description:{
            type:dataTypes.VARCHAR(255)
        },
        category_id:{
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        image:{
            type:dataTypes.VARCHAR(255),
            allowNull: false
        }
        
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Product = sequelize.define(alias, cols, config); 

    Product.associate = function (models){

        Product.belongsTo (models.Category, {
            as: "category",
            foreingKey: "categoryId"
        })
    }  

 
    return Product;
}