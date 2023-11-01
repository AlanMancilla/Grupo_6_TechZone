module.exports = (sequelize, dataTypes) => {
    
    let alias = "Product";

    let config = {
        timestamps: false,

        deletedAt: false
    }

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
            notNull: true,
        },
        price: {
            type: dataTypes.FLOAT,
            notNull: true,
        },
        description: {
            type: dataTypes.STRING,
            notNull: true,
        },
        image: {
            type: dataTypes.STRING,
            notNull: true,
        },
        category: {
            type: dataTypes.STRING,
            notNull: true,
        },
        gender: {
            type: dataTypes.STRING(30),
            notNull: true,
        },
        discount: {
            type: dataTypes.INTEGER,
            notNull: true,
        }
    };
    
    
    const Product = sequelize.define(alias,cols,config);
    return Product
}