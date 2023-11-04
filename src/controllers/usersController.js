const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../database/users.json');

const userControllers = {
    list: (req, res) => {
        let usersJson = fs.readFileSync(usersFilePath, 'utf-8');
        let users;

        if(usersJson == ""){
            res.render('users/userList',{users})
        }else{
            users = JSON.parse(usersJson);
            res.render('users/userList',{users});
        }
    },

    login : (req, res) =>{
        res.render('users/login');
    },

    processLogin : (req, res) =>{

        const errors = validationResult(req);

        if(errors.isEmpty()){
            let usersJson = fs.readFileSync(usersFilePath, 'utf-8');
            let users;
            let userLogin;

            if(usersJson == ""){
                users = [];
            }else{
                users = JSON.parse(usersJson);
            }

            users.forEach(user => {
                if(user.email == req.body.email){
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        userLogin = user;
                    }
                }
            });

            if(userLogin == undefined){
                return res.render('users/login', {
                    errors: {
                                msg : 'credenciales invalidas'
                            }, 
                    old: req.body
                })
            }

            delete userLogin.password;
            req.session.userLogged = userLogin;

            if(req.body.remember_user){
                res.cookie('userEmail', req.body.email, {maxAge: 1000 * 60 * 2})
            }

            res.redirect('/users/profile');

        }else{
            return res.render('users/login', {errors: errors.mapped(), old: req.body})
        }
    },

    register : (req, res) =>{
        res.render('users/register');
    },

    userStore : (req, res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){

            let usersJson = fs.readFileSync(usersFilePath, 'utf-8');
            let users;
            let newId;

            if(usersJson == ""){
                users = [];
                newId = 1;
            }else{
                users = JSON.parse(usersJson);
                newId = users[users.length - 1].id + 1
            }

            cryptPassword = bcrypt.hashSync(req.body.password, 10);

            let newUser = {
                id: newId,
                firstName: req.body.name,
                lastName: req.body.last_name,
                email: req.body.email,
                password: cryptPassword,
                role: "cliente",
                avatar: req.file?.filename || "userDefault.png"
            }

            users.push(newUser);

            fs.writeFile(usersFilePath, JSON.stringify(users), 'utf-8', (err) => {
                if (err) {
                    console.error('Error al escribir el archivo:', err);
                } else {
                    console.log('Archivo sobrescrito exitosamente.');
                }
            });

            //cambiar el redirect a un perfil
            res.redirect('/users/profile')

        }else{
            return res.render('users/register', {errors: errors.mapped(), old: req.body})
        }
    },

    profile: (req, res) => {
        return res.render( 'users/profile', { user: req.session.userLogged})
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()
        return res.redirect('/')
    }
}

module.exports = userControllers;