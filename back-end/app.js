const express = require('express');
require('./config/configDB');
const app = express();


const path              = require('path');
const articleRoutes     = require('./routes/articleRoute');
const commentaireRoutes = require('./routes/commentaireRoute');
const likeAndDislike    = require('./routes/likeAndDislikeRoute');
const userRoutes        = require('./routes/userRoute');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json({ limit: '50mb' }));


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/article', articleRoutes);
app.use('/api/commentaire', commentaireRoutes);
app.use('/api/likeanddislike', likeAndDislike);
app.use('/api/auth', userRoutes); 


module.exports = app;