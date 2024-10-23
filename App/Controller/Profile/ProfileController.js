import User, { imagePath } from "../../Models/User.js";
import path from "path";
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const showProfilePage = async (req, res) => {
    try {
        let user = await User.findById({ _id: req.user._id })
        return res.render('profile', {
            userDetils: user
        })
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).render('error', { message: 'Unable to load the profile. Please try again later.' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email, address, number, EditId } = req.body;
        let user = await User.findById(EditId);
        if (!user) {
            console.log("user not found");
            return res.redirect('/profile/');
        }
        user.name = name;
        user.email = email;
        user.address = address;
        user.number = number;
        if (req.file) {
            let imageName = user.image.split('/').pop()
            let imageFolder = path.resolve(__dirname, "../../..", `${imagePath}`);
            if (user.image) {
                let oldImage = path.join(imageFolder, imageName);
                if (fs.existsSync(oldImage)) {
                    try {
                        await fs.unlinkSync(oldImage);

                    } catch (error) {
                        console.error('Error deleting old image:', error);
                    }
                }
            }
            user.image = req.file.filename;
        }
        await user.save();
        return res.redirect('/profile/');
    } catch (error) {
        console.error('Error rendering dashboard:', error);
        res.status(500).render(error, { message: 'Unable to load the profile. Please try again later.' });
    }
}

export default {
    showProfilePage,
    updateProfile
}