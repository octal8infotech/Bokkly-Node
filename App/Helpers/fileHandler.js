import multer from "multer";
import path from 'path';
import fs from 'fs';

export const  userUploadDir = path.join('public', 'uploads', 'User');
console.log("user",userUploadDir);

const userStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, userUploadDir),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});
const handleUserMultipartData = multer({
    storage: userStorage,
    limits: { fileSize: 1000000 * 5 },
})
if (!fs.existsSync(userUploadDir)) {
    fs.mkdirSync(userUploadDir, { recursive: true });
}
export default {
    handleUserMultipartData,
}