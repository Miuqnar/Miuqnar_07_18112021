const connection = require("../config/configDB");


class User {
    constructor(obj = null){
        this.user_name   = '';
        this.email    = '';
        this.password = '';
        this.photo    = '';
        if(obj != null){
            if(obj.user_name) this.user_name  = obj.user_name;
            if(obj.email)this.email = obj.email;
            if(obj.password)this.password = obj.password;
            if(obj.photo)this.photo = obj.photo;
        }
    }
    static findAll(callback){
        const sql = "SELECT * FROM utilisateur";
        connection.query(sql, callback);
    }
    save(callback){
        const sql = "INSERT INTO utilisateur(user_name, email, password, photo) VALUES (?, ?, ?, ?)";
        connection.query(sql, [this.user_name, this.email, this.password, this.photo], callback);
    }
    static findOne(id, callback){
        const sql = "SELECT * FROM utilisateur WHERE id = ?";
        connection.query(sql, [id], callback);
    }
    updateOne(userId){
        const sql = "UPDATE utilisateur SET user_name = ?, email = ?, password = ?, photo = ? WHERE id = ?";
        connection.query(sql, [this.user_name, this.email, this.password, this.photo, userId], callback);
    }
    static deleteOne(userId, callback){
        const sql = "DELETE FROM utilisateur WHERE id = ?";
        connection.query(sql, [userId], callback);
    }


    static findBy(where, callback){
        const sql = "SELECT * FROM utilisateur WHERE ?";
        connection.query(sql, [where], callback);
    }
};


module.exports = User;
