const app = require('express')();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const {
//     googleClientID,
//     googleClientSecret
// } = require('./config/keys');
const PORT = process.env.PORT || 3000;

passport.use(
    new GoogleStrategy({
        clientID: process.env.googleClientID,
        clientSecret: process.env.googleClientSecret,
        callbackURL: '/return'
    }, (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile)
    })
);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

app.use(passport.initialize());

app.get('/login/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/return', passport.authenticate('google'), (req, res) => {
    res.send({
        id: req.user.id,
        name: req.user.displayName,
        email: req.user.emails[0].value
    });
});

app.get('/me', (req, res) => {
    console.log(req.userProfile);
    res.send({
        user: req.session.user
    });
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
})