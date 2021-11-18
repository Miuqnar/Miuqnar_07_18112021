const connection = require("../config/configDB");

class Commentaire {
    constructor(obj = null){
        this.message    = '';
        this.user_id    = null;
        this.article_id = null;
        if(obj != null){
            if(obj.message)this.message = obj.message;
            if(obj.user_id)this.user_id = obj.user_id;
            if(obj.article_id)this.article_id = obj.article_id;
        }
    }
    static findAll(commentaire){
        const sql = "SELECT * FROM commentaire";
        connection.query(sql, (error, res) => {
            if(error){
                commentaire(error, null);
                return;
            }else{
                commentaire(null, res);
            }
        });
    };
    save(commentaire){
        const sql = "INSERT INTO Commentaire (message, user_id, article_id) VALUES (?, ?, ?)";
        connection.query(sql, [this.message, this.user_id, this.article_id], commentaire, (error) => {
            if(error) throw error
        });
    };
    static findOne(id, commentaire){
        const sql = "SELECT * FROM Commentaire WHERE id = ?";
        connection.query(sql, [id], commentaire, (error) => {
            if(error) throw error
        });
    }

    updateOne(id, commentaire){
        const sql = "UPDATE Commentaire SET message = ?, user_id = ?, article_id = ? WHERE id = ?";
        connection.query(sql, [this.message, this.user_id, this.article_id, id], commentaire, (error) => {
            if(error) throw error
        })
    }
    static deleteOne(id, commentaire){
        const sql = "DELETE FROM commentaire WHERE id = ?";
        connection.query(sql, [id], commentaire, (error) => {
            if(error) throw error
        })
    }
};


module.exports = Commentaire; 