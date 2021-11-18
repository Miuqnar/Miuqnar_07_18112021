const connection = require("../config/configDB");

class Article {
    constructor(obj = null){
        this.title   = '';
        this.message = '';
        this.image   = '';
        this.user_id = null;
        if(obj != null){
            if(obj.title)this.title     = obj.title;
            if(obj.message)this.message = obj.message;
            if(obj.image)this.image     = obj.image;
            if(obj.user_id)this.user_id = obj.user_id;
        }
    }
    static findAll(articles){
        const sql = "SELECT * FROM article";
        connection.query(sql, (error, res) => {
            if(error){
                articles(error, null);
                return;
            }else{
                articles(null, res);
            }
        });
    };
    save(callback){
        const sql = "INSERT INTO article (title, message, image, user_id) VALUES (?, ?, ?, ?)";
        connection.query(sql, [this.title, this.message, this.image, this.user_id], callback, (error) => {
            if(error) throw error
        });
    };
    static findOne(id, callback){
        const sql = "SELECT * FROM article WHERE id = ?";
        connection.query(sql, [id], callback, (error) => {
            if(error) throw error
        });
    }

    updateOne(id, callback){
        const sql = "UPDATE article SET title = ?, message = ?, image = ?, user_id = ? WHERE id = ?";
        connection.query(sql, [this.title, this.message, this.image, this.user_id, id], callback, (error) => {
            if(error) throw error
        })
    }
    static deleteOne(id, callback){
        const sql = "DELETE FROM article WHERE id = ?";
        connection.query(sql, [id], callback, (error) => {
            if(error) throw error
        })
    }
};


module.exports = Article; 