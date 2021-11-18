<template>
    <div class="mx-2">
        <div class="container connection_bg ">
            <form action="" class="row row-cols-1 p-4" id="login_page">
                <div class="col d-flex justify-content-center">
                    <h3>Se connecter</h3>
                </div>
                <div class="col connection">
                    <label for="email"></label>
                    <input type="email" name="email" id="email" placeholder="Adresse eamil" required>
                </div>
                <div class="col connection">
                    <label for="password"></label>
                    <input type="password" name="" id="password" placeholder="Mot de passe" required>
                </div>
                <div class="col d-flex justify-content-center p-4"><button class="connecte">Se connecter</button></div>
            </form>
            <!-- <div class="row row-cols-2">
                <div class="col-9">Vous avez oublié votre mot de passe ?</div>
                <div class="col-3 d-flex justify-content-center pb-4"><button class="connecte">clic ici</button></div>
            </div> -->
        </div>
    </div>
</template>


<script>
export default {
    name: "Connexion",
    
}
</script>
<style>
/* body {
    background: url('../assets/images/plage.jpg') no-repeat center;
    background-size: cover;
    width: 100%;
    height: 100vh;
    color: #d8d8d8;
    font-family: 'Roboto';
}
.connection_bg {
    margin-top: 10rem;
    background-color: #2d2f33;
    max-width: 402px;
    border-radius: 15px;
}
.connection input{
    width: 100%;
    margin-top: 15px;
    padding: 8px;
    border-radius: 20px;
    border: 0.1mm ridge #4A4A4A;
    background-color: #3d3d3d;
    outline: none;
    padding-left: 18px;
    color: #d3d3d3;
}
.connection input::placeholder {
    color: #a7a5a5;
    font-size: 13px;
}

.connecte {
    background: linear-gradient(to right, #ff105f, #ffad06);
    border: none;
    box-shadow: 0 0 20px 9px #f74b071f;
    padding: 10px 20px;
    border-radius: 30px;
    transform: scale(1);
    transition: 0.2s;
}
.connecte:hover {
    transform: scale(1.1) !important;
} */
</style>



