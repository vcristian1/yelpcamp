module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()){
        req.flash('error', 'you must be signed in stupid!');
        return res.redirect('/login');
    }
    next();
}
