<template>
    <div class="mx-2">
        <div class="container wrap_container">
            <div class="wrap_items overflow-hidden w-100">
                <div class="slide-controls">
                    <input type="radio" name="slider" id="login" @click="diplayLogin(true)" checked >
                    <input type="radio" name="slider" id="signup" @click="diplayLogin(false)">
                    <label for="login" class="slide slide01 login ">Login</label>
                    <label for="signup" class="slide signup">Register</label>
                    <div class="slide-tab"></div>
                </div>
                <div class="form_container">
                    <form @submit.prevent="loginAccount()" method="POST" v-if="isLoginAndSignup.isLogin">
                        <div class="text-center">
                            <h3 class="fs-5 p-4">Se connecter</h3>
                        </div>
                        <div class="field">
                            <label for="email"></label>
                            <input v-model="login.email" type="email" class="input-file" id="email" placeholder="Adresse email" required>
                            <small></small>
                        </div>
                        <div class="field">
                            <label for="password"></label>
                            <input  v-model="login.password" type="password" class="input-file" id="password" placeholder="Password" required>
                            <small></small>
                        </div>
                        <div class="submit_fiel p-5">
                            <button type="submit" class="btn_submit">Se connecter</button>
                        </div>
                    </form>
                    <form @submit.prevent="createAccount()" method="POST" v-if="!isLoginAndSignup.isLogin">
                        <div class="text-center">
                            <h3 class="fs-5 p-3">Créer une compte</h3>
                        </div>
                        <div class="field">
                            <label for="pseudo"></label>
                            <input v-model="signup.pseudo" type="pseudo" class="input-file" id="pseudo" placeholder="Nom complet" required>
                            <small></small>
                        </div>
                        <div class="field">
                            <label for="email"></label>
                            <input  v-model="signup.email" type="email" class="input-file" id="email" placeholder="Adresse email" required>
                            <small></small>
                        </div>
                        <div class="field">
                            <label for="password"></label>
                            <input v-model="signup.password" type="password" class="input-file" id="password" placeholder="Password" required>
                            <small></small>
                        </div>
                        <div class="field">
                            <label for="confirmPassword"></label>
                            <input v-model="signup.confirmPassword" type="password" class="input-file" id="confirmPassword" placeholder="Confirm password" required>
                            <small></small>
                        </div>
                        <div class="submit_fiel pt-4 pb-3">
                            <button type="submit" class="btn_submit">Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Connextion",
    data() {
        return {
            signup: {
                pseudo: '', 
                email: '', 
                password: '',
                confirmPassword: ''
            },
            login: {
                email: '', 
                password: ''
            },
            errors: "",
            isLoginAndSignup: {
                isLogin: true
            }
        }
    },
    methods: {
        diplayLogin(show) {
            this.isLoginAndSignup.isLogin = show;
        },
        createAccount() {
            if(this.signup.password !=this.signup.confirmPassword){
                this.errors = 'Le mot de passe doit être identique';
                return false
            }
            if (this.signup.pseudo == "") {
                console.log("Veuillez entrer votre nom");
                return true
            } else {
                let pseudoRegex = new RegExp('^[a-zA-Z]+$', 'g')
                if (pseudoRegex.test(this.signup.pseudo) === false) {
                console.log("Le nom complet doit comporter que des lettres uniquement");
                    return true
                }
            }
            if (this.signup.email == "") {
                console.log("Veuillez entrer votre email");
                return true
            } else {
                let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g')
                if (emailRegex.test(this.signup.email) === false) {
                console.log("Veuillez entrer un email valide");
                    return true
                }
            }
            if (this.signup.password == "") {
                console.log("Veuillez entrer votre mot de passe");
                return true
            } else {
                let passwordRegex = new RegExp('^[a-zA-Z 0-9]+$', 'g')
                if (passwordRegex.test(this.signup.password) === false) {
                console.log("Veuillez entrer un mot de passe valide");
                    return true
                }
            }
            let token = "";
            fetch("http://localhost:3000/api/auth/signup", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json', 
                    'Accept': 'application/json',
                    'Authorization': `basic${token}`
                },
                body: JSON.stringify(this.signup)
            })
            .then(res => {
                console.log(res)
                if(res.ok){
                    return res.json();
                }
            })
            .then(res => console.log(res))
        },
        
        loginAccount() {
            

            let token = "";
            fetch("http://localhost:3000/api/auth/login", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json', 
                    'Accept': 'application/json',
                    'Authorization': `basic${token}`
                },
                body: JSON.stringify(this.login)
            })
            .then(res => {
                console.log(res)
                if(res.ok){
                    return res.json();
                }
            })
            .then(res => {
                if(localStorage.setItem("token", JSON.stringify(token))) {
                    return res
                }
                 if (this.login.email == "") {
                console.log("Veuillez entrer votre email");
                return true
                }else if(this.login.email == "" && this.login.password == ""){
                    console.log("email corret");
                    // return true
                }else{
                    window.location.href = "http://localhost:8080/#/accueil";
                    console.log('email incorrect')
                }
               
            })
        }
    }
}
</script>
<style>

body {
    width: 100%;
    height: 100vh;
    color: #d8d8d8;
    font-family: 'Roboto';
    background: url('../assets/images/plage.jpg') no-repeat center;
}
.wrap_container {
    width: 100%;
    height: 480px;
    margin-top: 8rem;
    /* overflow: hidden; */
    max-width: 390px;
    padding: 0 30px;
    border-radius: 15px;
    background-color: #2d2f33; 
       
}

.form_container {
    width: 200%;
    display: flex;
}
.form_container form{
    width: 50%;
}
.wrap_container .slide-controls {
    position: relative;
    display: flex;
    /* width: 100%; */
    /* margin: 30px 0 10px 0; */
    border-radius: 30px;
    overflow: hidden;
    width: 200px;
    margin: 35px auto;
    box-shadow: 0 0 20px 9px #ff61241f;
}

.slide-controls .slide {
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    z-index: 1;
    color: #fff;
    font-size: 15px;
    transition: all 0.6s ease;
}

.slide-controls .slide01 {
    color: #000;
}
.slide-controls .slide-tab {
    position: absolute;
    height: 100%;
    width: 50%;
    left: 0;
    z-index: 0;
    /* border-radius: 5px; */
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    background: linear-gradient(to right, #ff105f, #ffad06);
}

input[type="radio"]{
    display: none;
}
#signup:checked ~ .slide-tab{
    left: 50%;
}
#signup:checked ~ label.signup{
    color: #000;
}
#signup:checked ~ label.login{
    color: #fff;
}

.form_toggle{
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.field {
    height: 50px;
    width: 100%;
    /* margin-top: 20px; */
}

.input-file {
    width: 100%;
    margin: 5px 0;
    padding: 8px 0;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #999;
    background: transparent;
    color: #d8d8d8;
    outline: none;
    font-size: 14px;
    transition: all 0.3s ease;
}
.input-file::placeholder {
    color: #c0c0c0; 
}
.input-file:focus {
    border-bottom: 1px solid #ff105f;
}
.submit_fiel {
    display: flex;
    justify-content: center;
}

.btn_submit {
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    transform: scale(1);
    transition: 0.2s;
    box-shadow: 0 0 20px 9px #f74b071f;
    background: linear-gradient(to right, #ff105f, #ffad06);
}
.btn_submit:hover {
    transform: scale(1.1);
}

</style>
