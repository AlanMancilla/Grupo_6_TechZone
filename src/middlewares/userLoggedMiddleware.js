const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const bcrypt = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../database/users.json");

function loggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  /* let usersJson = fs.readFileSync(usersFilePath, 'utf-8');
   let users;
   let userCookie;

   if(usersJson == ""){
         users = [];
   }else{
         users = JSON.parse(usersJson);
   }

   users.forEach(user => {
      if(user.email == req.cookies.userEmail){
         userCookie = user;
      }
   }); */
  let users;
  let userCookie;
  if (req.cookies?.userEmail) {
    db.User.findOne({
      where: {
        email: req.cookies.userEmail,
      },
    }).then((user) => {
      if (user.email == req.cookies.userEmail) {
        userCookie = user;
      }
      if (userCookie) {
        delete userCookie.password;
        req.session.userLogged = userCookie;
      }

      if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
      }
      console.log(user);
      next();
    });
  } else {
    next();
  }
  /* if (userCookie) {
    delete userCookie.password;
    req.session.userLogged = userCookie;
  }

  if (req.session && req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next(); */
}

module.exports = loggedMiddleware;
