<template>
    <div class="mx-2">
        <div class="container wrap_containerProfil">
            <div class="">
                <div class="iconImage row row-cols-2 d-flex align-items-center">
                    <i class="far fa-user-circle col-3"></i>
                    <h3 class="col-2">Nom</h3>
                </div>
                <div class="form_container">
                    <form action="" class="form_items_input">
                        <!-- <div><input type="text"  placeholder="First name" aria-label="First name"></div> -->
                        <div><input type="password"  placeholder="modfier le mot de passe"></div>
                        <div><input type="password2"  placeholder="nouveau mot de passe"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
body {
    background-color: #1b1b1b;
    color: #d8d8d8;
    font-family: 'Roboto';
}
.wrap_containerProfil {
    border-radius: 20px;
    max-width: 400px;
    margin-top: 5rem;
    background: -webkit-linear-gradient(left, #2f1533, #6d1c42);
}
.iconImage{
    color: #d8d8d8;
    font-size: 3rem;
    cursor: pointer;
    padding: 10px 20px 0;
}
.form_container {
    display: flex;
    justify-content: center;
    padding: 20px;
    width: 100%;
}
.form_items_input {
    width: 100%;
    padding: 0 0 20px;
}
.form_items_input input{
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
input::placeholder {
    color: #c0c0c0; 
}
</style>