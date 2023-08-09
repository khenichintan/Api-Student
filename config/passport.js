const passport = require('passport');

const admin = require('../model/adminmodel');
const faculty = require('../model/faculty');

const JwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'kheni'
}

passport.use(new JwtStrategy(opts, async(user, done) => {
    let data = await admin.findOne({ email: user.data.email });
    if (data) {
        if (data.password == user.data.password) {
            console.log(data)
            return done(null, data)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}));

passport.use('faculty', new JwtStrategy(opts, async(user, done) => {
    let data = await faculty.findOne({ email: user.data.email });
    if (data) {
        if (data.password == user.data.password) {
            // console.log(data)
            return done(null, data)
        } else {
            return done(null, false)
        }
    } else {
        return done(null, false)
    }
}));


passport.serializeUser(async function(user, done) {
    // console.log("ser");
    return done(null, user.id);
})

passport.deserializeUser(async function(id, done) {
    let AD = await admin.findById(id);
    // console.log(AD);
    if (AD) {
        return done(null, AD)
    } else {
        let facData = await faculty.findById(id);
        if (facData) {
            return done(null, facData);
        } else {
            return done(null, false);
        }
    }
});

passport.setAuthnticate = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role == 'admin') {
            res.locals.admin = req.user;
        } else {
            res.locals.faculty = req.user;
        }
    }
    next();
}

module.exports = passport;