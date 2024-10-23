import express from 'express';
import AuthController from './AuthController.js';
import { validateLogin } from '../../Request/AuthRequest.js';
import passport from 'passport';
const router = express.Router();


router.get("/register",AuthController.showRegisterPage)
router.post("/insert-data",AuthController.register);
router.get('/login',AuthController.showLoginPage);
router.post('/check-login',passport.authenticate('local',{failureRedirect:'/auth/failRedirect'}),AuthController.checkLogin);
router.get("/failRedirect",async(req,res)=>{
    const { error } = validateLogin(req.body);
    if (error) {
        return res.render('login', {
            title: 'Login Page',
            errors: error.details,
            oldData: req.body
        });
    }
    console.log("invalid Email or Password");
    res.redirect("/login")
});
router.get("/logout",async(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log("somthing went wrong");
            return res.redirect('home');
        }
        else{
            return res.redirect("/dashboard/")
        }
       })
})


export default router;
