var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Live Code Share' });
});
router.get('/login/fail', function (req, res, next) {
    res.render('login', { title: 'Live Code Share', message: 'Incorrect Username or Password'});
});

router.post("/login",
    passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login/fail'
}), function (req, res) {
});



router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Live Code Share'});
});

router.post('/register', function (req, res, next) {

    req.checkBody('name', 'Empty Name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('password', 'Empty Password').notEmpty();
    req.checkBody('password', 'password do not match').equals(req.body.confirmPassword).notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            name: req.body.name,
            email: req.body.email,
            errorMessages: errors,
        });
    } else {
        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.save(function (err) {

            if (err) {
                console.log(err);
                res.render('register', { errorMessages: err
                });
            } else {
                res.redirect('/login');
            }
        })
    }
});
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;