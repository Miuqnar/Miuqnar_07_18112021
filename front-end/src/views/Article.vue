<template>
    <div class="mx-2 mt-3">
        <div class="container bg_container">

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
                    <h3 class="publication">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, quidem? Veniam dolorum expedita autem reprehenderit ipsum ratione, dolor asperiores dolore impedit cumque accusantium quis accusamus nihil dicta in rerum fugiat!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, quidem? Veniam dolorum expedita autem reprehenderit ipsum ratione, dolor asperiores dolore impedit cumque accusantium quis accusamus nihil dicta in rerum fugiat!</h3>
                </div>
            </div>

            <div class="row align-items-center mt-3 mb-1">
                <button class="col-3 likes"><i class="fas fa-thumbs-up likesIcon"></i>J'aime</button>
                <button class="col-2 d-flex commentaire justify-content-start"><i class="fas fa-comment-alt mt-1" id="commentaire"></i>Commenter</button>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    // !-- <div v-for="article in articles" class="mx-2 mt-3"> -->
    // name: 'Acceuil',
    // data() {
    //     return {
    //         articles: []
    //     }
    // },
    // methods: {
    //     getArticles() {
    //         fetch("http://localhost:3000/api/article", {
    //             method: 'GET',
    //             headers: {
    //                 'Authorization': 'basic '+ localStorage.getItem('token'),
    //             }
    //         })
    //         .then(res => {
    //             console.log(res)
    //             if(res.ok){
    //                 return res.json();
    //             }
    //         })
    //         .then(res => {
    //             this.articles = res;
    //         })
    //     }
    // },
}
</script>
<style>
body {
    background-color: #1b1b1b;
    color: #d8d8d8;
    font-family: 'Roboto';
}
.bg_container {
    background-color: #2d2f33;
    border-radius: 10px;
    max-width: 500px;
    padding-top: 8px;
    padding-bottom: 10px;
}
.icon_photo {
    color: #d8d8d8;
    font-size: 3rem;
}
.publication {
    font-size: 14px;
}
.likes {
    color: #d8d8d8;
    font-size: 14px;
    border: none;
    background: none;
    transform: scale(1);
    transition: 0.2s;
}
.likesIcon {
    color: #848ec4;
    font-size: 1.2rem;
    padding-right: 10px; 
}
.likes:hover {
    transform: scale(1.1);
}
.commentaire {
    color: #d8d8d8;
    font-size: 14px;
    background: none;
    border: none;
    transform: scale(1);
    transition: 0.2s;
}
.commentaire:hover {
    transform: scale(1.1);
}
#commentaire {
    font-size: 1.2rem;
    padding-right: 10px; 
    color: #848ec4;
}

</style>