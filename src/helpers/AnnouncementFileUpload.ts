import multer from "multer";
import {checkFileTypes, fileStorage} from "../middlewares/upload";
import {Request} from "express";

const AnnouncementFileUpload = multer({
    storage: fileStorage('uploads'),
    fileFilter: (req: Request, file, cb) => {
        if (file.fieldname === 'images') {
            checkFileTypes(['image/png', 'image/jpg', "image/jpeg"], file, cb)
        } else {
            return cb(null, true)
        }
    }
}).fields([{name: "images", maxCount: 10}, {name: "documents", maxCount: 10}]);

export default AnnouncementFileUpload;
