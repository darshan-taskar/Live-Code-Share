var express = require('express');
var router = express.Router();

var User = require('../models/user');
router.get('/createTask', function (req, res) 
{
    var newTask = new Task();
    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.render('error');
        } else {
            res.redirect('/task/' + data._id);
        }
    })
});

router.get('/task/:id', function (req, res) {
    if (req.params.id) {
        Task.findOne({ _id: req.params.id }, function (err, data) {
            if (err) {
                console.log("erooor " +err);
                res.render('error', { invalid : "This Collab doesn't exist"  });
            }
            if (data) {
                res.render('task', { content: data.content, roomID: data.id });
            } else {
                res.render('error', { invalid: "Is not you its me!" });
            }
        })
    } else {
        res.render('error', { invalid : "Page Not Found" });
    }
});

module.exports = router;