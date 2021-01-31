import fs from 'fs';
import path from "path";

class FileHelper {

    static async deleteFile(pathFile: string): Promise<any> {
        const filePath = path.join(__dirname, '..', '..', pathFile);
        await fs.unlink(filePath, err => {
            console.log(err);
            if (!err) {
                return true
            }
        })
    }

}

export default FileHelper;
