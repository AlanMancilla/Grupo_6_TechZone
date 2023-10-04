const { validationResult } = require('express-validator')

const userControllers = {
    login : (req, res) =>{
        console.log("Este es el login");
        res.render('users/login.ejs');
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