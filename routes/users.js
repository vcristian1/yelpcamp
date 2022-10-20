const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
router.get('/register', (req, res) => {
    res.render('users/register')
})

//strictly registers a user, doesnt log them in.
//catchAsync is imported and added to the post route so it takes away any issues/errors from here
//then pass them along to next
router.post('/register', catchAsync (async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
    req.flash('success', 'YelpCamp user created successfully!')
    // console.log(registeredUser);
    res.redirect('/campgrounds');
}));

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/campgrounds');
})

module.exports = router;