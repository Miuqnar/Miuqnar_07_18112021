const LikeAndDislike = require('../models/likes');


exports.getAllLikes = (req, res) => {
    LikeAndDislike.findAll((error, data) => {
        if(error){
            res.status(500).json({ error })
        }else{
            res.status(200).json(data)
        }
    });
};

exports.createLike = (req, res) => {
    if(req.body.user_id && req.body.article_id){
        const createlike = new LikeAndDislike(req.body)
        if((req.body.likes || req.body.dislikes) && !(req.body.likes && req.body.dislikes)){
            createlike.save((error) => {
                if(error){
                    res.status(500).json({ error })
                }else{
                    res.status(200).json({ message: "user liked"})
                }
            })
        }else{
            res.status(400).json({ error: "champ mal renseigner"});
        }
    }else if(!req.body.user_id){
        res.status(400).json({ error: "ID d'utilisateur obligatoire"});
    }else if(!req.body.article_id){
        res.status(400).json({ error: "ID d'article obligatoire"}); 
    }
    
};

exports.likeAndDislikeFind = (req, res) => {
    LikeAndDislike.findBy(req.body, (error, resultat) => {
        res.status(200).json(resultat)
        if(error){
            res.status(500).json({ error })
        }else{
            res.status(200).json(resultat)
        }
    })
};

exports.likeAndDislikeUpdate = (req, res) => {
    const updateLikesDislike = new LikeAndDislike(req.body)
    if(req.body.likes || req.body.dislikes){
        updateLikesDislike.updateOne(req.params.id, (error) => {
            if(error){
                res.status(400).json({ error })
            }else{
                res.status(200).json({ message: "modification effectué"})
            }
        })
    }else{
        res.status(400).json({ error })
    }
    // if(likes === -1 && dislikes === -1){
    //     updateLikesDislike.updateOne(req.params.user_id, req.params.article_id,() => {
    //         res.status(200).json({ message: "Neutral"})
    //     })
    // }else{ 
    //     res.status(400).json({ error: "error"});
    // }

};

exports.detelelikes = (req, res) => {
    
    LikeAndDislike.deleteOne(req.params.id, (error) => {
        if(error){
            res.status(400).json({ error })
        }else{
            res.status(200).json({ message: "deleted" }) 
        }
    })
    // const likes = (req.body.likes);
    // const dislikes = (req.body.dislikes);
    // if(likes == 0 && dislikes === 0){
    //     LikeAndDislike.deleteOne(req.params.id,() => {
    //         res.status(200).json({ message: "Neutral"})
    //     })
    // }else{
    //     res.status(400).json({ error: "error"});
    // }
}