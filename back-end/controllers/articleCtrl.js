const Article        = require('../models/article');
const Commentaire    = require('../models/commentaire');
const LikeAndDislike = require('../models/likes');
const User           = require('../models/User')
const fs             = require('fs');

exports.getAllObj = (req, res) => {
    Article.findAll(async (error, data) => {
        if(error){
            console.log("error", error);
            res.status(500).json({ error });
        }else{
            for(let i = 0; i < data.length; i++) {
                let commentArticle = [];
                let like = [];
                let dislike = [];
                commentArticle = await Commentaire.findBy({ article_id: data[i].id}).catch(e => {console.log(e)})
                // for await (c of commentArticle){
                //     await User.findOne(c.user_id, (error, user) => {
                //         if(error){
                //             c.user = {}
                //         }else{
                //             c.user = user[0]
                //         }
                //     })
                // }
                like = await LikeAndDislike.findBy(data[i].id, { likes: 1}).catch(e => {console.log(e)})
                dislike = await LikeAndDislike.findBy(data[i].id, { dislikes: 1}).catch(e => {console.log(e)})

                await User.findOne(data[i].user_id, (error, user) => {
                    if(error){
                        data[i].user = {}
                    }else{
                        data[i].user = user[0]
                    }
                })

                data[i].comments = commentArticle;
                data[i].newComment = "";
                data[i].likes = like;
                data[i].dislikes = dislike;

            };
            res.status(200).json(data)
        }
    }) 
};


exports.createObj = (req, res) => {
    if(req.body.user_id){
        const article = new Article({
            message:       req.body.message,
            image:         ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null ),
            user_id:       req.body.user_id
        });
        article.save()
        .then(() => res.status(201).json({ message: "Objet crée" }))
        .catch((error) => res.status(400).json({ error }));

    }else{
        res.status(400).json({ error: "ID d'utilisateur obligatoire" });
    }
    
};

exports.getOneObj = (req, res) => {
    const article = (req.params.id)
    Article.findOne(article, (error, data) => {
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
    // const imgUrl = "";
    // if(req.file){
    //     imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // }
    const article = new Article({
        message:       req.body.message,
        image:         imgUrl,
        user_id:       req.body.user_id
    });
    article.update(req.params.id, (error => {
        if(error){
            res.status(400).json({ error })
        }else{
            res.status(200).json({ message: 'Objet modifié'})
        }
    }))
};


exports.deteleObjt = (req, res) => {
    Article.deleteOne(req.params.id, (error) => {
        if(error){
            res.status(400).json({ error })
        }else{
            
            res.status(200).json({ message: "Objet supprimé"})
        }
    })
};
