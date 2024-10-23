import express from 'express';
import ProfileController from './ProfileController.js';
import fileHandler from '../../Helpers/fileHandler.js';
const { handleUserMultipartData } = fileHandler
const router = express.Router();


router.get("/", ProfileController.showProfilePage)
router.post('/update-profile', handleUserMultipartData.single('image'), ProfileController.updateProfile)



export default router;
