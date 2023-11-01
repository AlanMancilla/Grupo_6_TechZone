module.exports = (sequelize, dataTypes) => {
    
    let alias = "users";
    let config = {
    tableName: "users",
    timesTamps: false
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
        last_name: {
            type: dataTypes.STRING,
            notNull: true,
        },
        email: {
            type: dataTypes.STRING,
            notNull: true,
        },
        password: {
            type: dataTypes.STRING,
            notNull: true,
        },
        birthday: {
            type: dataTypes.DATE,
            notNull: true,
        },
        age: {
            type: dataTypes.INTEGER,
            notNull: true,
        },
        adress: {
            type: dataTypes.STRING,
            notNull: true,
        }
    };
    
    
    const Users = sequelize.define(alias,cols,config);
    return Users
}



