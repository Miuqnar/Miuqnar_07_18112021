const connection = require("../config/configDB");

class Commentaire {
    constructor(obj = null){
        this.newComment    = '';
        this.user_id    = null;
        this.article_id = null;
        if(obj != null){
            if(obj.newComment)this.newComment = obj.newComment;
            if(obj.user_id)this.user_id = obj.user_id;
            if(obj.article_id)this.article_id = obj.article_id;
        }
    }
    static findAll(commentaire){
        const sql = "SELECT * FROM commentaire ORDER BY id DESC";
        connection.query(sql, (error, res) => {
            if(error){
                commentaire(error, null);
                return;
            }else{
                commentaire(null, res);
            }
        });
    };
    save(callback){
        const sql = "INSERT INTO Commentaire (newComment, user_id, article_id) VALUES (?, ?, ?)";
        connection.query(sql, [this.newComment, this.user_id, this.article_id], callback, (error) => {
            if(error) throw error
        });
    };
    static findOne(id, callback){
        const sql = "SELECT * FROM Commentaire WHERE id = ?";
        connection.query(sql, [id], callback, (error) => {
            if(error) throw error
        });
    }

    updateOne(id, callback){
        const sql = "UPDATE Commentaire SET newComment = ?, user_id = ? article_id = ? WHERE id = ?";
        connection.query(sql, [this.newComment, this.user_id, id, this.article_id], callback, (error) => {
            if(error) throw error
        })
    }
    static deleteOne(id, callback){
        const sql = "DELETE FROM commentaire WHERE id = ?";
        connection.query(sql, [id], callback, (error) => {
            if(error) throw error
        })
    }
    static findBy(where){
        const sql = "SELECT * FROM Commentaire, utilisateur WHERE Commentaire.user_id = utilisateur.id AND ?";
        return  new Promise((resolve, reject) => {
            connection.query(sql, [where], function(error, data){
                if(error){
                    reject(error)
                }else{
                    resolve(data)
                }
            });
        })
    }
};


module.exports = Commentaire; 