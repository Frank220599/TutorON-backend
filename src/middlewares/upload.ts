import {HttpError} from "routing-controllers";

const multer = require('multer');
const uniqid = require('uniqid');
const path = require('path');

export const checkFileTypes = (fileTypes: Array<string>, file: any, cb: any) => {
    if (fileTypes.indexOf(file.mimetype) >= 0) {
        cb(null, true)
    } else {
        cb(null, false);
    }
};

// multer conf
export const fileStorage = (folderName: string) => multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, folderName)
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, uniqid.time() + path.extname(file.originalname))
    }
});

export const fileFilter = (fileTypes: Array<string>) => (req: any, file: any, cb: any) => {
    if (!fileTypes) {
        return cb(null, true)
    }
    checkFileTypes(fileTypes, file, cb);
};

const upload = (folderName: string, fileTypes?: Array<string>) => ({
    storage: fileStorage(folderName),
    fileFilter: fileFilter(fileTypes)
});

export default upload;
