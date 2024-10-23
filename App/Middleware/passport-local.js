import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../Models/User.js';
import bcrypt from 'bcrypt';

passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) return done(null, false, { message: 'Incorrect email or password.' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect email or password.' });
        return done(null, user);
    } catch (error) {
        console.error(error);
        return done(error);
    }
}));

passport.serializeUser(async (admin, done) => {
    return done(null, admin.id);
})

passport.deserializeUser(async (id, done) => {
    let userRecord = await User.findById(id);
    if (!userRecord) return done(null, false);
    return done(null, userRecord)
})

passport.setAuth = ((req, res, next) => {
    if (req.isAuthenticated()) res.locals.user = req.user;
    return next();
})

passport.checkAuth = ((req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect('/dashboard/')
    next();


})
export default passport