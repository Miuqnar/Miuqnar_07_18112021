const express = require('express');
const router  = express.Router();

const commentaireCtrl = require("../controllers/commentaireCtrl");
const auth            = require("../middleware/auth");

router.get   ('/', auth, commentaireCtrl.getAllObj);
router.post  ('/', auth, commentaireCtrl.createObj);
router.get   ('/:id', auth, commentaireCtrl.getOneObj);
router.put   ('/:id', auth, commentaireCtrl.updateObj);
router.delete('/:id', auth, commentaireCtrl.deteleObjt);


module.exports = router;