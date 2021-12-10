const express = require('express');
const router  = express.Router();

const likeAndDislikeCtrl = require('../controllers/likesCtrl');
const auth               = require('../middleware/auth');

router.get   ('/',auth, likeAndDislikeCtrl.getAllLikes);
router.post  ('/',auth, likeAndDislikeCtrl.createLike);
// router.post   ('/search',auth, likeAndDislikeCtrl.likeAndDislikeFind); 
// router.put   ('/:id/like',auth, likeAndDislikeCtrl.likeAndDislikeUpdate);
// router.delete('/:id',auth, likeAndDislikeCtrl.detelelikes);

module.exports = router;