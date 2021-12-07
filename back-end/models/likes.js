const connection = require('../config/configDB');

class LikeAndDislike {
    constructor(obj = null){
        this.likes      = 0;
        this.dislikes   = 0;
        this.user_id    = null;
        this.article_id = null;
        if(obj != null){
            if(obj.likes)this.likes = obj.likes;
            if(obj.dislikes)this.dislikes = obj.dislikes;
            if(obj.user_id)this.user_id = obj.user_id;
            if(obj.article_id)this.article_id = obj.article_id;
        }
    };
    static findAll(callback){
        const sql = "SELECT * FROM LikeAndDislike";
        connection.query(sql, callback)
    };
    save(callback){
        const sql = "INSERT INTO likeAndDislike (likes, dislikes, user_id, article_id) VALUES (?, ?, ?, ?)";
        connection.query(sql, [this.likes, this.dislikes, this.user_id, this.article_id], callback)
    };
    
    static findOne(id, callback){
        const sql = "SELECT * FROM likeAndDislike  WHERE id = ?";
        connection.query(sql, [id], callback);
    }
    static findBy(article_id, where = 1){
        const sql = "SELECT * FROM LikeAndDislike WHERE article_id = ? and ?";
        return  new Promise((resolve, reject) => {
            connection.query(sql, [article_id, where], function(error, data){
                if(error){
                    reject(error)
                }else{
                    resolve(data)
                }
            });
        })
    }

    updateOne(id, callback){
        const sql = "UPDATE likeAndDislike SET likes = ?, dislikes = ?, user_id = ?, article_id = ? WHERE id = ?";
        connection.query(sql, [this.likes, this.dislikes, this.user_id, this.article_id, id], callback)
    }
    static deleteOne(id, callback){
        const sql = "DELETE FROM likeAndDislike WHERE id = ?";
        connection.query(sql, [id], callback)
    }
    
};

module.exports = LikeAndDislike;