<template>
    <div class="bodyBg">
        <Menu/>

        <!-- post message -->
        
        <div class="container bg_container_projet mt-5">
            <div class="px-2 bg_container">
                <div  class="row  align-items-center">
                    <div class="col-12 textareaPublier">
                        <textarea v-model="sendComment.message"  name="textarea" id="textarea" placeholder="Tapez un message"></textarea>
                    </div>
                </div>
                <div class="row align-items-center mt-3 mb-1">
                    <div class="col-1">
                        <label for="choose_file"><i class="fas fa-images"></i></label>
                        <input @change="selectFile( $event )" type="file" ref="file" id="choose_file">
                    </div>
                    <div @click="postArticles()" class="col d-flex justify-content-end publier">
                        <button type="submit" id="btn_sumit">{{ publish }}</button>
                    </div>
                </div>
                
            </div>
            <div>
                <h5 class="p-3">Publication récentes</h5>
            </div>

            <!--------------------------------------------------- message publiéé -------------------------------------------->

            <div class="px-2 bg_container mt-3" v-for="article in articles" :key="'article-' + article.id"> 
                <div class="row">
                    <div class="pt-3 icon_photo">
                        <i class="far fa-user-circle"></i>
                        <span class="fs-5 userName text-warning">
                            {{ article.user ?  article.user.user_name : "" }}
                        </span>
                    </div>
                    
                    <div v-if="article.user_id == sendComment.user_id" @click="deleteMessage(article.id)"  class="col d-flex justify-content-end">
                        <button type="button" class="btnDelete"><i class="fas fa-trash" id="deleteIcon"></i></button>
                    </div>
                </div>

                <div class="row pt-5 mb-4">
                    <div class="col">
                        <h5 class="publication px-3 fs-6">
                            {{ article.message }}
                        </h5>
                        <img class="w-100 " v-if="article.image" :src="article.image" alt="plublication 2">
                        <span class="px-2 liked">
                            <i :class="'fas fa-thumbs-up ' + ( article.likes ? (article.likes.filter(l => l.user_id == sendComment.user_id).length > 0 ? 'text-primary': '' ): '' )" id="likesAnCommentaireIcon"></i>
                            {{ article.likes ? article.likes.length : 0 }} 
                        </span>
                        <div class="d-flex">
                            <div @click="postLikes(article)" class="d-flex justify-content-start align-items-center  mb-2 mt-2 px-1 btnLikeContent">
                                <div>
                                    <button  class="likesAnCommentaire">
                                        <i class="fas fa-thumbs-up" id="likesAnCommentaireIcon"></i>
                                        {{ btnlike }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bgComment">
                            <div v-for="commentArticle in article.comments" :key="commentArticle">
                                <span class="text-warning userComment">
                                    {{ commentArticle.user ? commentArticle.user.user_name: "" }}
                                </span>
                                <p class="publicationComment px-3">
                                    <!-- <span class="text-warning">{{ commentArticle.user ? commentArticle.user.user_name: "" }}</span> -->
                                    {{ commentArticle.newComment }}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <input v-model="article.newComment" type="text" id="commentInput" placeholder="Écrivez un commentaire">
                    <button @click="postComment(article)" class="border-0 bg-transparent">
                        <i class="fas fa-paper-plane" id="likesAnCommentaireIconPaper"></i>
                    </button>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
// import moment from 'moment'
import Menu from '../components/Menu.vue';

export default {
    name: 'Acceuil',
    components: {
        Menu
    },
    data() {
        return {
            publish: "Publier",
            sendComment: {
                message: "",
                image: "",
                user_id: localStorage.getItem('userId')
            },

            articles: [],
            btnlike: "J'aime",
            commetArticle: {
                newComment: "",
                user_id: "",
            },
            likeAndDislike: {
                likes: 0,
                dislikes: 0,
                user_id: localStorage.getItem('userId'),
            }

        }
    },
    mounted() {
        this.getArticles()
    },
    methods: {
        selectFile( event ){
            this.sendComment.image = event.target.files[0];
        },
        
        
        ////////////////////////////////////// POST A MESSAGE ///////////////////////////////////////
        postArticles() {

            const formData = new FormData()
            formData.append('message', this.sendComment.message)
            formData.append('image', this.sendComment.image)
            formData.append('user_id', this.sendComment.user_id)

            fetch("http://localhost:3000/api/article", {
                method: 'POST',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                    'Accept': 'application/json',
                },
                body: formData 
            })
            .then(res => res.json( console.log))
            .then(() => {
                this.articles.push(this.sendComment.message);
                this.sendComment.message = "",
                this.sendComment.image = "";
                this.getArticles();
            })
            .catch(error => console.log(error))
        },

        //////////////////////////////// GET ALL A MESSAGE ///////////////////////////////////////

        getArticles(){
            fetch("http://localhost:3000/api/article", {
                method: 'GET',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(data => {
                this.articles = data
                console.log(this.articles)
            })
            .catch(error => console.log(error))
        },

        /////////////////////////// POST A COMMENT //////////////////////////////////////

        postComment(article) {
            fetch("http://localhost:3000/api/commentaire", {
                method: 'POST',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                    'content-type': 'application/json', 
                },
                body: JSON.stringify({
                    article_id: article.id,
                    newComment: article.newComment,
                    user_id: localStorage.getItem('userId')
                })
            })
            .then(res => res.json())
            .then(() => {
               this.getArticles()
            })
            .catch(error => console.log(error))
        },

        /////////////////////////////// DELETE A POST //////////////////////////////////////

        deleteMessage(id) {
            fetch("http://localhost:3000/api/article/" + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(() => {
                this.getArticles();
            })
            .catch(error => console.log(error))
        },
        
        ///////////////////////////////////  LIKE ///////////////////////////////////////////
        postLikes(article) {
            fetch(`http://localhost:3000/api/likeanddislike`,  {
                method: 'POST',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                    'content-type': 'application/json', 
                },
                body: JSON.stringify({
                    likes:    1,
                    dislikes: 0,
                    user_id:   localStorage.getItem('userId'),
                    article_id: article.id
                })
            })
            .then(res => res.json())
            .then(() => {
                this.getArticles()
            })
            .catch(error => console.log(error))
        },
     
        deleteLikes() {
            fetch("http://localhost:3000/api/likeanddislike", {
                method: 'DELETE',
                headers: {
                    'Authorization': 'basic ' + localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.log(error))
        }
    },
}
</script>

<style>
body {
    height: 100%;
    width: 100%;
    background-color: #1b1b1b !important;
    color: #b4b4b4;
    font-family: 'Roboto';
}
.bg_container_projet {
    padding-top: 5rem;
}
.bg_container_projet  {
    /* background: linear-gradient(to left, #ff105f, #27428b); */
    background: linear-gradient(to left, #4A4A4A, #303338);
    /* background: #303338; */
    max-width: 500px;
    padding: .5rem .5rem .5rem .5rem;
    border-radius: 10px;
}
.bg_container {
    position: relative;
    /* background: -webkit-linear-gradient(left, #020102, #250112); */
    background: -webkit-linear-gradient(left, #020102, #282828);
    /* background: -webkit-linear-gradient(top, #2f1533, #6d1c42); */
    /* background: #282828; */
    border-radius: 10px;
    /* max-width: 500px; */
    padding-top: 8px;
    padding-bottom: 10px;
}
.icon_photo {
    color: #d8d8d8;
    font-size: 3rem;
    display: flex;
    align-items: center;
    padding-left: 1.5rem;
}
.userName {
    padding-top: 10px;
    padding-left: 1.5rem;
}
/* .titleInput::placeholder {
    color: #b4b4b4;
    font-size: 15px;
} */
#textarea{
    padding: 8px;
    width: 100%;
    /* background: linear-gradient(to left, #880c35, #371050); */
    /* background: linear-gradient(to left, #440218, #1b0827); */
    background: linear-gradient(to left, #3b3939, #131314);
    border-radius: 15px;
    outline: none;
    resize: none;
    color: #d8d8d8;
    padding-left: 15px;
    border: 0.5mm ridge #424242;
}

#textarea::placeholder {
    color: #b4b4b4;
    font-size: 13px;
}
input[type="file"] {
    display: none;
}
label[for="choose_file"] {
    background: linear-gradient(to right, #ff105f, #ffad06);
     background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.5rem;
    padding: 8px;
    transform: scale(1);
    transition: 0.2s;
}
label[for="choose_file"]:hover {
    transform: scale(1.1);
}

.btnDelete{
    position: absolute;
    top: 24px;
    background: none;
    border: none;
    color: #e79d08;
    padding-right: 1rem;
    font-size: 1.2rem;
    transform: scale(1);
    transition: 0.2s;
    cursor: pointer;
}
.btnDelete:hover {
    transform: scale(1.1);
}
.publication {
    display: flex;
    word-wrap: wrap;
    text-align: justify;
    width: 100%;
    padding: 1rem 0;
    /* box-shadow: 3px 4px 6px #300404; */
    border-radius: 10px;
    margin-bottom: 1rem;
}
.bgComment {
    position: relative;
    margin-top: 5rem;
    padding: 20px 10px 0;
    border-radius: 15px;
    /* border: 0.5mm ridge #333333; */
}
.userComment {
    position: absolute;
    top: -1px;
}
.publicationComment {
    font-size: 14px;
    padding: 7px 0;
    margin-left: 50px;
    background: #2b2b2b;
    max-width: 310px;
    border-radius: 25px;
}
.btnLikeContent{
    border-top: 1px solid #252525;
    border-bottom: 1px solid #252525;
    padding-top: 8px;
    padding-bottom: 8px;
}
.likesAnCommentaire {
    font-size: 14px;
    border: none;
    transform: scale(1);
    transition: 0.2s;
    padding: 4px;
    border-radius: 8px;
    background: linear-gradient(to right, #ff105f, #ffad06);
}
.dislikeAnCommentaire {
    border: none;
    border-radius: 8px;
    background: linear-gradient(to right, #ff0404 , #ca0a4a);
}
#likesAnCommentaireIcon {
    padding-right: 10px; 
}
#likesAnCommentaireIconPaper{
    background: linear-gradient(to right, #ff105f, #ffad06);
    background-clip: text;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.2rem;
    padding-right: 10px; 
}
.likesAnCommentaire:hover {
    transform: scale(1.1);
}
.liked i:last-child{
    padding-top: 2rem;
}
#commentInput{
    width: 70%;
    border-radius: 5px;
    outline: none;
    color: #d8d8d8;
    padding-left: 15px;
    border: 0.5mm ridge #4A4A4A;
    background: linear-gradient(to left, #3b3939, #131314);
    /* background: linear-gradient(to left, #af1247, #470d6b); */
    /* background: linear-gradient(to left, #440218, #1b0827); */
}
#commentInput::placeholder {
    color: #b4b4b4;
    font-size: 12px;
}

#btn_sumit {
    margin: 10px 0;
    padding: 4px 12px;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    transform: scale(1);
    transition: 0.2s;
    background: linear-gradient(to right, #ff105f, #ffad06);
}

#btn_sumit:hover {
    transform: scale(1.1);
}


</style>