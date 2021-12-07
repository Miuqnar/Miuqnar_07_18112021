const User      = require('../models/User');
const bcrypt    = require('bcrypt');
const jwt       = require('jsonwebtoken');
const fs        = require('fs');
const saltRound = 10
require('dotenv').config();



exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, saltRound)
    .then(hash => {
        const user = new User({
            user_name: req.body.user_name,
            email:     req.body.email,
            password:  hash,
            photo:     req.body.photo 
        })
        user.save((error) => {
            if(error){
                res.status(400).json({ message: 'utilisateur existant'})
            }else{
                res.status(201).json({ message: 'Utilisateur créé'})
            }
        })
    })
    .catch(error => res.status(400).json({ error }))
};

exports.login = (req,res) => { 
    User.findBy({ email: req.body.email }, (error, data) => {
        console.log(data);
        if(data.length == 0){
            return res.status(401).json({ error: 'utilisateur introuvable'})
        }
        let user = data[0]
        bcrypt.compare(req.body.password, user.password)
        .then(validPass => {
            console.log(validPass)
            if(!validPass){
                return res.status(401).json({ error: 'Mot_de_passe incorrect'})
            }
            //si elle a trouvé vrais alors un renvoi un status 200
            res.status(200).json({ 
                userId: user.id,
                token: jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h'}),
                // userName: user.user_name,
            })
        })
       .catch(error => res.status(500).json({ error }));
    })   
}


exports.getAll = (req, res) => {
    User.findAll((error, data) => {
        if(error){
            console.log(`error`, error) 
            res.status(500).json({ error: 'error', message: err})
        }else{
            res.status(200).json(data)
        }
    })
};

exports.createObj = (req, res) => {
    const user = new User({
        user_name: req.body.user_name,
        email:     req.body.email,
        password:  req.body.password,
        photo:     ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null ),
    });
    console.log(user);
    user.save((error) => {
        if(error){
            res.status(500).json({ error: 'error', message: error})
        }else{
            res.status(201).json({message: 'utilisateur créé'});
        }
    })
};

exports.getOne = (req, res) => {
    User.findOne(req.params.id, (error, data) => {
        if(error){
            res.status(500).json({ error })
        }else{
            if(data.length == 0){
                res.status(400).json({error: 'error', message: 'utilisateur introuvable'})
            }else{
                res.status(200).json(data[0])
            }
        }
    })
};

exports.updateObj = (req, res) => {

    const imgUrl = "";
    if(req.file){
        imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const user = new User({
        user_name: req.body.user_name,
        email:     req.body.email,
        password:  req.body.password,
        photo:     imgUrl 
    });
    user.updateOne(req.params.id, (error => {
        if(error){
            res.status(400).json({ error })
        }else{
            res.status(200).json({ message: 'Objet modifié'})
        }
    }))
   
};

exports.deleteObj = (req, res) => {
    User.deleteOne(req.params.id, (error) => {
        if(error){
            res.status(400).json({ error })
        }else{
            res.status(200).json({ message: 'Objet supprimé'})
        }
    })

    
}






