const { validationResult } = require('express-validator');
const db = require("../database/models");
const bcrypt = require('bcryptjs');

const userControllers = {
  list: (req, res) => {
    db.User.findAll()
      .then(users => {
        if (users == "") {
          res.render("users/userList", { users });
        } else {
          res.render("users/userList", { users });
        }
      })
  },

  login: (req, res) => {
    res.render("users/login");
  },

  processLogin: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      let userLogin;

      try {
        const user = await db.User.findOne({
          where: {
            email: req.body.email,
          },
        });

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          userLogin = user.dataValues;
        }

        if (userLogin === undefined) {
          return res.render("users/login", {
            errors: {
              msg: "Credenciales inválidas",
            },
            old: req.body,
          });
        }

        req.session.userLogged = userLogin;

        delete userLogin.password;
        delete req.session.userLogged.password;

        if (req.body.remember_user) {
          res.cookie('userEmail', req.body.email, { maxAge: 1000 * 60 * 48 }); // seg * min * 48 horas
        }

        res.redirect("/users/profile")

      } catch (error) {
        console.error("Error en el proceso de inicio de sesión:", error);
        return res.redirect("index");
      }
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
