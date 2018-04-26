const passport = require('passport');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin')
const User = mongoose.model('User')
// const UserInfoSchema = mongoose.model('UserInfo')


module.exports = app => {

    //user signIn, signOut, current_user
    app.get(
        '/auth/google', passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'), (req, res) => {
            !req.user._userInfo ? res.redirect('/userInfo') : res.redirect('/');           
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

}