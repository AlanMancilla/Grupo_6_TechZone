const db = require("../database/models");

async function loggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let userCookie;

  try {
    if (req.cookies?.userEmail) {
      const user = await db.User.findOne({
        where: {
          email: req.cookies.userEmail,
        },
      });

      if (user && user.email === req.cookies.userEmail) {
        userCookie = user;
      }

      if (userCookie) {
        delete userCookie.password;
        req.session.userLogged = userCookie;
      }

    }

    if (req.session && req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }
    
  } catch (error) {
    console.error("Error en middleware de inicio de sesión:", error);
  }

  next();
}

module.exports = loggedMiddleware;
