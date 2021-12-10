<template >
    <div class="container-fluid menu_bar" >
        <div class="container">
            <div class="row row-cols-2">
                <div class=" logo">
                    <img class="col-6" src="../assets/logo/groupomania03.png" alt="groupomania social NetWork">
                </div>
                <div class="col-6 d-flex justify-content-end">
                    <div class="imgIcon" @click="menuToggle()">
                        <!-- <i class="far fa-user-circle"></i> -->
                        <i v-if="!photo" class="far fa-user-circle"></i>
                        <img v-if="photo" class="img_user_circle " :src="photo" />
                    </div>
                    <div class="profil" @mouseleave="menuToggle()">
                        <ul>
                            <li @click="accueil()"><i class="fas fa-home"></i>Accueil</li>
                            <li @click="redirectMenu()" ><i class="fas fa-user-alt"></i>Mon Profile</li>
                            <li @click="logout()" ><i class="fas fa-sign-out-alt"></i>Logout</li>
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
            menuDisplay: true,
            photo: localStorage.getItem('photo')
        }
    },
    methods: {
        menuToggle() {
          let toggleBar = document.querySelector('.profil');
          toggleBar.classList.toggle('active')
        },
        accueil() {
            this.$router.replace("/accueil")
        },
        redirectMenu() {
            this.$router.push("/profil")
        },
        logout() {
            this.$router.replace("/")
            localStorage.clear()
        },
        
    }
}
</script>
<style>
.menu_bar{
    background: linear-gradient(to top, #8b0c36, #1d3e99);
    /* background: linear-gradient(to top, #707070, #000000); */
    line-height: 70px;
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
    top: 80px;
    /* right: 60px; */
    padding: 8px 20px;
    background: linear-gradient(to bottom, #8b0c36, #1d3e99);
    /* background: -webkit-linear-gradient(top, #707070, #000000); */
    width: 200px;
    /* box-sizing: 0 5px 25px rgba(0,0,0,0.1); */
    border-radius: 15px;
    visibility: hidden;
    color: #d8d8d8;
    opacity: 0;
    z-index: 2;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.profil.active {
    visibility: visible;
    opacity: 1;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.profil::before {
    content: '';
    position: absolute;
    top: -5px;
    right: 28px;
    width: 20px;
    height: 20px;
    background:  #860b34;
    /* background:  #6b6b6b; */
    transform: rotate(45deg);
    z-index: -10;
}

.profil ul li {
    list-style: none;
    padding: 8px 0;
    border-bottom: 1px solid rgb(0, 0, 0);
    cursor: pointer;
    transition: 0.2s;
}
.profil ul li:hover {
    color: #ffad06;
    /* border-radius: 15px; */
    width: 100%;
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