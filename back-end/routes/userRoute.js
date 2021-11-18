const express = require('express');
const router = express.Router();

const auth     = require('../middleware/auth');
const multer   = require('../middleware/multer_config');
const userCtrl = require('../controllers/userCtrl');

router.post  ('/signup', userCtrl.signup);
router.post  ('/login', userCtrl.login);

router.get   ('/', auth, userCtrl.getAll);
router.post  ('/', auth, multer, userCtrl.createObj);
router.get   ('/:id', auth, userCtrl.getOne);
router.put   ('/:id', auth, multer, userCtrl.updateObj);
router.delete('/:id', auth, userCtrl.deleteObj);



module.exports = router; 