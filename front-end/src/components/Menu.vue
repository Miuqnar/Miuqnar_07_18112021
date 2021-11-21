<template >
    <div class="container-fluid menu_bar">
        <div class="container">
            <div class="row row-cols-2">
                <div class=" logo">
                    <img class="col-6" src="../assets/logo/groupomania02.png" alt="groupomania social NetWork">
                </div>
                <!-- <div class="col icon_home">
                   <i class="fas fa-home"></i>
                </div> -->
                <div class="col-6 d-flex justify-content-end">
                    <div class="imgIcon" @click="menuToggle()">
                    <i class="far fa-user-circle"></i>
                        <!-- <img class="" src="../assets/user/user02.png" alt=""> -->
                    </div>
                    <div class="profil">
                        <h3 class="text-white">Hello World</h3>
                        <ul>
                            <li @click="redirectMenu()" ><i class="fas fa-user-alt"></i>Mon Profile</li>
                            <li><i class="fas fa-sign-out-alt"></i>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div id="nav">
            <router-link to="/inscription">Inscription</router-link>/
            <router-link to="/connexion">Connexion</router-link>/
            <router-link to="/accueil">Acceuil</router-link>/
            <router-link to="/profil">Profil</router-link>/
            <router-link to="/article">Article</router-link>/
        </div> -->
    </div>
    
</template>
<script>
export default {
    name: "Menu",
    data() {
        return {
            
        }
    },
    methods: {
        menuToggle() {
          let toggleBar = document.querySelector('.profil');
          toggleBar.classList.toggle('active')
        },
        redirectMenu() {
            this.$router.push("/profil")
        }
    },
}
</script>
<style>
.menu_bar{
    background: linear-gradient(to left, #8b0c36, #1d3e99);
    line-height: 60px;
} 
.logo img{
    width: 12rem;
}

.imgIcon{
    color: #d8d8d8;
    font-size: 3rem;
    cursor: pointer;
}
.profil{
    position: absolute;
    top: 70px;
    /* right: 60px; */
    padding: 10px 20px;
    background: linear-gradient(to right, #4b0b40, #590a7e);
    width: 200px;
    /* box-sizing: 0 5px 25px rgba(0,0,0,0.1); */
    border-radius: 15px;
    visibility: hidden;
    color: #d8d8d8;
    opacity: 0;
    z-index: 2;
}
.profil.active {
    visibility: visible;
    opacity: 1;
}
.profil::before {
    content: '';
    position: absolute;
    top: -5px;
    right: 28px;
    width: 20px;
    height: 20px;
    background: linear-gradient(to right, #c729ad, #9419ce);
    transform: rotate(45deg);
    z-index: -10;
}
.profil h3{
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
    font-weight: 500;
    color: #555;
}
.profil ul li {
    list-style: none;
    padding: 10px 0;
    border-top: 1px solid rgb(0, 0, 0);
    cursor: pointer;
    /* display: flex;
    align-content: center;
    justify-content: center; */
}
.profil i:first-child  {
    max-width: 20px;
    margin-right: 10px;
    opacity: 0.5;
}
.profil i:first-child:hover {
    opacity: 1;
}
/* @media screen and (max-width: 667px){
    .icon_home {
        display: none;
    }
} */
</style>