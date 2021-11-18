const multer = require('multer');

const mime_types = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const fileStorage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'images');
    },
    filename: (req, res, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = mime_types[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
        callback(null, Date.now().toString + '_ ' + file.originalname)
    },
    // fileFilter: (req, res, callback) => {
    //     const mime_types = [
    //         'image/jpg',
    //         'image/jpeg',
    //         'image/png'
    //     ].find(acceptedFormat => acceptedFormat == file.mimetype);
    //     if(mime_types){
    //         return callback(null, true);
    //     }else{
    //         return callback(null, false);
    //     }
    // }
});

module.exports = multer({storage: fileStorage}).single('image');