const express = require('express');
const router  = express.Router();

const articleCtrl = require("../controllers/articleCtrl");
const auth        = require('../middleware/auth');

router.get   ('/', auth, articleCtrl.getAllObj);
router.post  ('/', auth, articleCtrl.createObj);
router.get   ('/:id', auth, articleCtrl.getOneObj);
router.put   ('/:id', auth, articleCtrl.updateObj);
router.delete('/:id', auth, articleCtrl.deteleObjt);


module.exports = router;