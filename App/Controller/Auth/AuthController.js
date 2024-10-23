import User from "../../Models/User.js";
import { validateRegister, validateLogin } from '../../Request/AuthRequest.js';
import bcrypt from 'bcrypt';
const showLoginPage = async (req, res) => {
    try {
        res.render('login', {
            title: 'Login Page',
            errors: {},
            oldData: {}
        });
    } catch (error) {
        console.error('Error rendering login page:', error);
        res.status(500).render('error', { message: 'Unable to load the login page. Please try again later.' });
    }
};

const showRegisterPage = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });
        let err = null; 
        if(existingUser){
             err = [{ message: "User already exists with this email." }];
        }
        return res.render('register', {
            title: 'Register Page',
            err: err,
            oldData: {},
            errors: [] 
        });
    } catch (error) {
        console.error('Error rendering register page:', error);
        res.status(500).render('error', { message: 'Unable to load the Register page. Please try again later.' });
    }
};



const register = async (req, res) => {
    try {
        const { error } = validateRegister(req.body);
        if (error) {
            // console.log("err",error._original.name);
            return res.render('register', {
                title: 'Register Page',
                errors: error.details,
                oldData: req.body
            });
            
        }
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            let userData = {
                name,
                email,
                password: hashedPassword
            }
            let user = await User.create(userData)
            if (!user) {
                console.log('Failed to create user');
                return res.redirect('back')
            }


            return res.redirect('/auth/login')
        } else {
            let err = [{message:"User already exists with this email."}];
            console.log(err);
            
            return res.status(400).render('register', {
                title: 'Register Page',
                err:err,
                oldData: req.body
            });
        }
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).render('error', { message: 'Unable to register. Please try again later.' });
    }
};

const checkLogin = async (req, res) => {
    try {
        console.log("login ssuccessfully");
        return res.redirect('/dashboard/');

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).render('error', { message: 'Unable to Login. Please try again later.' });
    }
}


export default { showLoginPage, showRegisterPage, checkLogin, register };
