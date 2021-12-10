const connection = require("../config/configDB");

class Article {
    constructor(obj = null){
        this.message = '';
        this.image   = '';
        this.user_id = null;
        if(obj != null){
            if(obj.message)this.message = obj.message;
            if(obj.image)this.image     = obj.image;
            if(obj.user_id)this.user_id = obj.user_id;
        }
    }
    static findAll(articles){
        const sql = "SELECT * FROM article, utilisateur WHERE article.user_id = utilisateur.id ORDER BY article.id DESC";
        // SELECT * FROM article JOIN utilisateur ON article.user_id = utilisateur.id ORDER BY article.id DESC
        // SELECT * FROM article, utilisateur WHERE utilisateur.id = article.user_id ORDER BY article.id DESC
        connection.query(sql, (error, res) => {
            if(error){
                articles(error, null);
                return;
            }else{
                articles(null, res);
            }
        });
    };
    
    save(){
        const sql = "INSERT INTO article (message, image, user_id) VALUES (?, ?, ?)";
        return  new Promise((resolve, reject) => {
            connection.query(sql, [this.message, this.image, this.user_id], function(error, data){
                if(error){
                    reject(error)
                }else{
                    resolve(data)
                }
            });
        })
        // connection.query(sql, [this.message, this.image, this.user_id], callback, (error) => {
        //     if(error) throw error
        // });
    };
    static findOne(id, callback){
        const sql = "SELECT * FROM article WHERE id = ?";
        connection.query(sql, [id], callback, (error) => {
            if(error) throw error
        });
    }

    updateOne(id, callback){
        const sql = "UPDATE article SET message = ?, image = ?, user_id = ? WHERE id = ?";
        connection.query(sql, [this.message, this.image, this.user_id, id], callback, (error) => {
            if(error) throw error
        })
    }
    static deleteOne(id, callback){
        const sql = "DELETE FROM article WHERE id = ?"
        connection.query(sql, [id], callback, (error) => {
            if(error) throw error
        })
    }
};
module.exports = Article; 
