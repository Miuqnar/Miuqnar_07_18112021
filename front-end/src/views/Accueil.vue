<template>
    <div class="mx-2 mt-5">
        <div class="container bg_container">

            <div class="row row-cols-2 align-items-center">
                <div class="col-2 d-flex justify-content-start icon_photo">
                    <i class="far fa-user-circle"></i>
                </div>
                <div class="col-10 textareaPublier">
                    <textarea  name="textarea" id="textarea" placeholder="Ecrivez un commentaire"></textarea>
                </div>
            </div>

            <div class="row align-items-center mt-3 mb-1">
                <div class="col-1">
                    <label for="choose_file"><i class="fas fa-images"></i></label>
                    <input type="file" name="file" id="choose_file">
                </div>
                <div class="col d-flex justify-content-end publier"><button type="submit">Publier</button></div>
            </div>
        </div>
        
        <div class="mt-3">
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

#textarea{
    padding: 8px;
    width: 100%;
    background-color: #4A4A4A;
    border-radius: 15px;
    outline: none;
    resize: none;
    color: #d8d8d8;
    padding-left: 15px;
    border: 0.5mm ridge #4A4A4A;
}

#textarea::placeholder {
    color: #a7a5a5;
    font-size: 13px;
}
input[type="file"] {
    display: none;
}
label[for="choose_file"] {
    color: #848ec4;
    font-size: 1.5rem;
    padding: 8px;
    transform: scale(1);
    transition: 0.2s;
}
label[for="choose_file"]:hover {
    transform: scale(1.1);
}

button[type="submit"] {
    /* margin: 10px 0; */
    padding: 4px 12px;
    border: 1px #636a92 solid;
    border-radius: 10px;
    background: #454a64;
    color: #fff;
    font-size: 1rem;
    transform: scale(1);
    transition: 0.2s;
}

button[type="submit"]:hover {
    background-color: transparent;
    opacity: .8;
    transform: scale(1.1);
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
// 1C1E21