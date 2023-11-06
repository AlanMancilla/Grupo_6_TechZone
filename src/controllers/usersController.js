const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("../database/models");
const { log } = require("console");
const { AsyncLocalStorage } = require("async_hooks");

const usersFilePath = path.join(__dirname, "../database/users.json");

const userControllers = {
  list: (req, res) => {
    let usersJson = fs.readFileSync(usersFilePath, "utf-8");
    let users;

    if (usersJson == "") {
      res.render("users/userList", { users });
    } else {
      users = JSON.parse(usersJson);
      res.render("users/userList", { users });
    }
  },

  login: (req, res) => {
    res.render("users/login");
  },

  processLogin: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      let userLogin;

      db.User.findOne({
        where: {
          email: req.body.email,
        },
      })
        .then((user) => {
          console.log(user);
          if (bcrypt.compareSync(req.body.password, user.password)) {
            userLogin = user.dataValues;
          }
        })
        .then((algo) => {
          console.log(userLogin);
          if (userLogin == undefined) {
            return res.render("users/login", {
              errors: {
                msg: "credenciales invalidas",
              },
              old: req.body,
            });
          }

          delete userLogin.password;
          req.session.userLogged = userLogin;

          if (req.body.remember_user) {
            res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 2 });
          }

          res.render("users/profile", { user: userLogin });
        });
    } else {
      return res.render("users/login", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  register: (req, res) => {
    res.render("users/register");
  },

  userStore: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      let cryptPassword = bcrypt.hashSync(req.body.password, 10);

      let newUser = {
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: cryptPassword,
        role: "cliente",
        avatar: req.file?.filename || "userDefault.png",
      };

      db.User.create(newUser)
        .then((user) => {
          res.redirect("/users/profile");
        })
        .catch((err) => {
          console.error("Error al crear el usuario:", err);
        });
    } else {
      return res.render("users/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  profile: (req, res) => {
    return res.render("users/profile", { user: req.session.userLogged });
  },

  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = userControllers;
