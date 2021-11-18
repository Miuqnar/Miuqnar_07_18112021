const Commentaire = require('../models/commentaire');

exports.getAllObj = (req, res) => {
    Commentaire.findAll((error, data) => {
        if(error){
            console.log("error", error);
            res.status(500).json({ error });
        }else{
            res.status(200).json(data)
        }
    })
};

exports.createObj = (req, res) => {
    if(req.body.user_id && req.body.article_id){
        const commentaire = new Commentaire({
            message: req.body.message,
            user_id: req.body.user_id,
            article_id: req.body.article_id
        });
        commentaire.save((error) => {
            if(error){
                console.log(error)
                res.status(500).json({ error })
            }else{
                res.status(201).json({ message: "Objet crée"})
            }
        })
    }else if(!req.body.user_id){
        res.status(400).json({ error: "ID d'utilisateur obligatoire"});
    }else if(!req.body.article_id){
        res.status(400).json({ error: "ID d'article obligatoire"});
    }
    
};

exports.getOneObj = (req, res) => {
    Commentaire.findOne(req.params.id,(error, data) => {
        if(error){
            res.status(500).json({ error })
            console.log(error)
        }else{
            if(data.length == 0){
                console.log(data)
                res.status(400).json({ error: "error", message: "Object introuvable"})
            }else{
                res.status(200).json(data[0])
            }
        };
    });
};

exports.updateObj = (req, res) => {
    const commentaire = new Commentaire(req.body);
    commentaire.updateOne(req.params.id, (error => {
        if(error){
            res.status(400).json({ error })
        }else{
            res.status(200).json({ message: 'Objet modifié'})
        }
    }))
};

exports.deteleObjt = (req, res) => {
    Commentaire.deleteOne(req.params.id, (error) => {
        if(error){
            res.status(400).json({ error })
        }else{
            res.status(200).json({ message: "Objet supprimé"})
        }
    })
};