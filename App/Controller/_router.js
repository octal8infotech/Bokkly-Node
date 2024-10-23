import express from 'express';
import Dashbord from './Dashboard/_router.js'
import Auth from './Auth/_router.js';
import Profile from './Profile/_router.js'
import passport from '../Middleware/passport-local.js';

const router = express.Router();

router.use('/dashboard', Dashbord);
router.use('/auth', Auth);
router.use('/profile',passport.checkAuth, Profile);

export default router;
