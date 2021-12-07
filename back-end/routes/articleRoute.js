const express = require('express');
const router  = express.Router();

const articleCtrl = require("../controllers/articleCtrl");
const auth        = require('../middleware/auth');
const multer      = require("../middleware/multer_config")

router.get   ('/', auth, articleCtrl.getAllObj);
router.post  ('/', auth, multer, articleCtrl.createObj);
router.get   ('/:id', auth, articleCtrl.getOneObj);
router.put   ('/:id', auth, multer, articleCtrl.updateObj);
router.delete('/:id', auth, articleCtrl.deteleObjt);


module.exports = router;