import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './App/Database/db.js';
import models from './App/Models/EloquentCollection.js';
import router from './App/web/router.js';
import session from 'express-session';
import passport from 'passport';
import passportlocal from './App/Middleware/passport-local.js';
const app = express();


db();
models();

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'App', 'View'));
app.use(express.static(path.join(__dirname, 'App', 'Assets')));

app.use(express.urlencoded({ extended: true }));
app.use('/public',express.static(path.join(__dirname,'public')));
app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: process.env.SESSION_RESAVE === 'true',
    saveUninitialized: process.env.SESSION_SAVE_UNINITIALIZED === 'true',
    cookie: {
        maxAge: parseInt(process.env.SESSION_MAX_AGE),
        httpOnly: process.env.SESSION_HTTP_ONLY === 'true',
    }
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuth);
router(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `⚡️[NodeJs server]: Server is running at http://localhost:${PORT}/dashboard`);
    console.log("databse connected");
});
