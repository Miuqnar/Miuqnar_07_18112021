const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/git': 'git'
}


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'images');
    },
    //le nom de fichier utiliser
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');
      const extension = MIME_TYPES[file.mimetype]; 
      callback(null, name + Date.now() + '.' + extension);
    }
});
  
  module.exports = multer({storage: storage}).single('image');



