const Article = require('../models/article');
const fs      = require('fs');

exports.getAllObj = (req, res) => {
    Article.findAll((error, data) => {
        if(error){
            console.log("error", error);
            res.status(500).json({ error });
        }else{
            res.status(200).json(data)
        }
    })
};

exports.createObj = (req, res) => {
    if(req.body.user_id){
        // const imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const article = new Article({
            title:   req.body.title,
            message: req.body.message,
            image:   req.body.image,
            user_id: req.body.user_id
        });
        article.save((error) => {
            if(error){
                console.log(error)
                res.status(500).json({ error })
            }else{
                res.status(201).json({ message: "Objet crée"})
            }
        })
    }else{
        res.status(400).json({ error: "ID d'utilisateur obligatoire" });
    }
};

exports.getOneObj = (req, res) => {
    Article.findOne(req.params.id,(error, data) => {
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
    const imgUrl = "";
    if(req.file){
        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const article = new Article({
        title:   req.body.title,
        message: req.body.message,
        image:   imgUrl,
        user_id: req.body.user_id
    });
    article.update(req.params.id, (error => {
        if(error){
            res.status(400).json({ error })
        }else{
            res.status(200).json({ message: 'Objet modifié'})
        }
    }))
};

// exports.updateObj = (req, res) => {
//     const updateObj = req.file ? 
    
//     {...JSON.parse(req.body), image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : { ...req.body };
//     const article = new Article(req.body);
//     article.updateOne({ id: req.params.id }, {...updateObj, id: req.params.id }, (error) => {
//         if(error){
//             res.status(400).json({ error })
//         }else{
//             res.status(200).json({ message: 'Objet modifié'})
//         }
        
//     })
// };

exports.deteleObjt = (req, res) => {
    const articleD = req.params.id;
    const filename = articleD.image.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
        Article.deleteOne(req.params.id, (error) => {
            if(error){
                res.status(400).json({ error })
            }else{
                res.status(200).json({ message: "Objet supprimé"})
            }
        })
    })
};