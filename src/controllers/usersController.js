const { validationResult } = require('express-validator')

const userControllers = {
    login : (req, res) =>{
        res.render('users/login.ejs');
    },
    loginLol : (req, res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){
            res.send(req.body)
        }else{
            return res.render('users/login.ejs', {errors: errors.mapped(), old: req.body})
        }
    },

    register : (req, res) =>{
        res.render('users/register.ejs');
    },
    userStore : (req, res) =>{
        const errors = validationResult(req);

        if(errors.isEmpty()){
            res.send(req.body)
        }else{
            return res.render('users/register.ejs', {errors: errors.mapped(), old: req.body})
        }

        /* res.render('users/register.ejs'); */
    }
}

module.exports = userControllers;