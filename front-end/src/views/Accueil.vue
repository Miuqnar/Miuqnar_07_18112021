<template>
    <div class="container bg_container_projet mt-5">
        <div class="px-2 bg_container">
            <!-- post message -->
            <div  class="row row-cols-2 align-items-center">
                <div class="col-2 d-flex justify-content-start icon_photo">
                    <i class="far fa-user-circle"></i>
                </div>
                <div class="col-10 textareaPublier">
                    <textarea v-model="sendComment.title"  name="textarea" id="textarea" placeholder="Ecrivez un commentaire"></textarea>
                </div>
            </div>
            <div class="row align-items-center mt-3 mb-1">
                <div class="col-1">
                    <label for="choose_file"><i class="fas fa-images"></i></label>
                    <input type="file" name="file" id="choose_file">
                </div>
                <div @click="getArticles()" class="col d-flex justify-content-end publier"><button type="submit" id="btn_sumit">Publier</button></div>
            </div>
        </div>
        <div><h5 class="p-3">Publication récentes</h5></div>
        <!-- message publiéé -->
        <div class="px-2 bg_container mt-2" v-for="article in articles" v-bind:key="article">
            <div class="row align-items-center">
                <div class="col-2 pb-2 icon_photo">
                    <i class="far fa-user-circle"></i>
                </div>
                <div class="col">
                    <h2 class="fs-4">Amaral</h2>
                </div>
                <div class="col d-flex justify-content-end">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p class="publication px-3">{{ article }}</p>
                </div>
            </div>
            <div class="d-flex justify-content-start align-items-center mt-3 mb-1">
                <div><button class="likesAnCommentaire"><i class="fas fa-thumbs-up" id="likesAnCommentaireIcon"></i>J'aime</button></div>
                <div class="px-2"><button class="likesAnCommentaire"><i class="fas fa-comment-alt" id="likesAnCommentaireIcon"></i>Commenter</button></div>
            </div>
            <div><input v-on:keyup.enter="getArticles()" v-model="sendComment.message" type="text" id="commentInput" placeholder="Écrivez un commentaire"><button @click="getArticles()" class="border-0 bg-transparent"><i class="fas fa-paper-plane" id="likesAnCommentaireIcon"></i></button></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Acceuil',
    data() {
        return {
            sendComment: {
                title: "",
                message: "",
                image: "",
                user_id:  localStorage.getItem('userId')
            },
            articles: [],
            
        }
    },
    methods: {
        getArticles() {
            fetch("http://localhost:3000/api/article", {
                method: 'POST',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                    'content-type': 'application/json', 
                },
                body: JSON.stringify(this.sendComment)
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.articles.push(this.sendComment.title),
                this.sendComment.title = ""
            })
        }
    },
}
</script>

<style>
body {
    background-color: #1b1b1b;
    color: #d8d8d8;
    font-family: 'Roboto';
}
.bg_container_projet  {
    background: linear-gradient(to left, #ff105f, #27428b);
    max-width: 500px;
    padding: .5rem .5rem .5rem .5rem;
    border-radius: 10px;
}
.bg_container {
    background: -webkit-linear-gradient(left, #2f1533, #6d1c42);
    border-radius: 10px;
    /* max-width: 500px; */
    padding-top: 8px;
    padding-bottom: 10px;
}
.icon_photo {
    color: #d8d8d8;
    font-size: 3rem;
}

#textarea{
    padding: 8px;
    width: 100%;
    background: linear-gradient(to left, #880c35, #371050);
    border-radius: 15px;
    outline: none;
    resize: none;
    color: #d8d8d8;
    padding-left: 15px;
    border: 0.5mm ridge #4A4A4A;
}

#textarea::placeholder {
    color: #dbdbdb;
    font-size: 13px;
}
#commentInput{
    width: 70%;
    background: linear-gradient(to left, #af1247, #470d6b);
    border-radius: 5px;
    outline: none;
    color: #d8d8d8;
    padding-left: 15px;
    border: 0.5mm ridge #4A4A4A;
}
#commentInput::placeholder {
    color: #dbdbdb;
    font-size: 12px;
}
input[type="file"] {
    display: none;
}
label[for="choose_file"] {
    background: linear-gradient(to right, #ff105f, #ffad06) ;
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

.icon_photo {
    color: #d8d8d8;
    font-size: 3rem;
}
.publication {
    display: flex;
    word-wrap: wrap;
    font-size: 14px;
    text-align: justify;
}
.likesAnCommentaire {
    color: #d8d8d8;
    font-size: 14px;
    border: none;
    background: none;
    transform: scale(1);
    transition: 0.2s;
    
}
#likesAnCommentaireIcon {
    background: linear-gradient(to right, #ff105f, #ffad06) ;
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
</style>