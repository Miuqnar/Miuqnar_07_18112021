<template>
    <div>
        

            <!-- message publiéé -->

             <div class="px-2 bg_container mt-2" v-for="article in articles" :key="'article-' + article.id"> 
                <div class="row">

                    <div class=" pb-2 icon_photo">
                        <i class="far fa-user-circle"></i>
                        <h2 class="fs-4 userName">{{ sendComment.nameUser }}</h2>
                    </div>
                    
                    <div @click="deleteMessage(article.id)"  class="col d-flex justify-content-end">
                        <button type="button" class="btnDelete"><i class="fas fa-trash" id="deleteIcon"></i></button>
                    </div>
                </div>

                <div class="row">
                    <div class="col"> -->
                        <!-- <h3 class="publication px-3">{{ article.description }}</h3> -->
                        <h5 class="publication px-3 fs-6">{{ article.message }}</h5>
                        <p class="publicationComment px-3">{{ article.newComment }}</p>
                    </div>
                </div>

                 <span class="publicationComment px-3">{{ likeAndDislike.likes }}</span>
                <div @click="postLikes()" class="d-flex justify-content-start align-items-center  mb-2">
                    <div><button  class="likesAnCommentaire"><i class="fas fa-thumbs-up" id="likesAnCommentaireIcon"></i>J'aime</button></div> -->
                    <!-- <div class="px-2"><button class="likesAnCommentaire"><i class="fas fa-comment-alt" id="likesAnCommentaireIcon"></i>Commenter</button></div> -->
                 </div> -->

                <div>
                    <input v-model="commetArticle.newComment" type="text" id="commentInput" placeholder="Écrivez un commentaire">
                    <button @click="postComment(article.id)" class="border-0 bg-transparent"><i class="fas fa-paper-plane" id="likesAnCommentaireIcon"></i></button>
                </div>
            </div>
        
   </div>
</template>
<script>

export default {
    name: "listArticles",
   data() {
      return {
          commetArticle: {
            newComment: "",
            user_id: localStorage.getItem('userId'),
            // article_id: localStorage.getItem('articleId'),
        },
        articles: []
      }
   },
   mounted() {
      this.getComment();
   },
   methods: {
       postComment() {
            fetch("http://localhost:3000/api/commentaire", {
                method: 'POST',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                    'content-type': 'application/json', 
                },
                body: JSON.stringify(this.commetArticle)
            })
            .then(res => res.json())
            .then(res => {
                // this.articles.push(this.commetArticle.newComment);
                // this.commetArticle.newComment = "";
               if(res.ok){
                  window.location.reload();
                  this.commetArticle = {}
               }else{
                  alert('message commenté')
                  location.reload()
               }
                this.getComment();
                console.log(res)
            })
        },
        ///////////////////////// GET A COMMENT //////////////////////////////////////
        getComment(){
            fetch("http://localhost:3000/api/commentaire", {
                method: 'GET',
                headers: {
                    'Authorization': 'basic ' + localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(data => {
                // this.articles = data
                console.log(data)
            })
        },
   },
}
</script>
<style>
body {
    height: 100%;
    width: 100%;
    background-color: #1b1b1b !important;
    color: #d8d8d8;
    font-family: 'Roboto';
}
.bg_container_projet {
    padding-top: 5rem;
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



#commentInput{
    width: 85%;
    background: linear-gradient(to left, #af1247, #470d6b);
    border-radius: 5px;
    outline: none;
    color: #d8d8d8;
    padding-left: 15px;
    border: 0.5mm ridge #4A4A4A;
}
/* #commentInput::placeholder {
    color: #dbdbdb;
    font-size: 12px;
} */



.publicationComment {
    display: flex;
    word-wrap: wrap;
    font-size: 14px;
    padding-top: 1rem;
    text-align: justify;
}













.publicationComment {
    display: flex;
    word-wrap: wrap;
    font-size: 14px;
    padding-top: 1rem;
    text-align: justify;
}
#commentInput::placeholder {
    color: #dbdbdb;
    font-size: 12px;
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
</style>