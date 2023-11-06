module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let config = {
    timestamps: false,

    deletedAt: false,
  };
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
    },
    avatar: {
      type: dataTypes.STRING,
      notNull: true,
    },
    role: {
      type: dataTypes.STRING,
      notNull: true,
    },
  };

  const User = sequelize.define(alias, cols, config);
  return User;
};
