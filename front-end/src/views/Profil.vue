<template>
  <div>
      <Menu/>
        <div class="bgBody">
            <div v-if="account" class="mx-2">
                <div class="container wrap_containerProfil">
                    <div>
                        <div class="iconImage">
                            <div class="">
                                <label for="choose_file_profil">
                                    <i v-if="!account.photo" class="far fa-user-circle"></i>
                                    <img v-if="account.photo" class="img_user_circle " :src="account.photo" />
                                </label>
                                <input @change="selectFile( $event )" type="file" ref="file" id="choose_file_profil">
                            </div>
                            <div class=" d-flex justify-content-center">
                                <!-- <button type="submit" id="btn_sumitProfil">{{ publish }}</button> -->
                                <span>Cliquez sur l'icon pour modifier l'image</span>
                            </div>
                        </div>
                        <div class="px-4 pt-4  infUser">
                            <div class="pb-2">
                                <span><span class="text-warning">Pseudo</span>: {{ account.user_name }}</span>
                            </div>
                            <div>
                                <span><span class="text-warning">Email</span>: {{ account.email }}</span>
                            </div>
                        </div>
                        <div class="form_container">
                            <form action="" class="form_items_input">
                                <div><input v-model="account.password" type="password"  placeholder="modifier le mot de passe"></div>
                                <!-- <div>
                                    <div @click="modifyProfil()" class="btn_compte"><button>{{ accountButton.enregistrer }}</button></div>
                                    <div @click="deleteOneUser()" class="btn_compte"><button>{{ accountButton.desativer }}</button></div>
                                </div> -->
                            </form>
                        </div>
                        <div class="pb-4">
                            <div @click="modifyProfil()" type="submit" class="btn_compte"><button>{{ accountButton.enregistrer }}</button></div>
                            <div @click="deleteOneUser()" class="btn_compte"><button>{{ accountButton.desativer }}</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
// import "./Connexion.vue"
import Menu from '../components/Menu.vue';
export default {
    name: "Profil",
    components: {
        Menu
    },
    data() {
        return {
            publish: 'Modifier la photo',
            account: null,
            userId: localStorage.getItem("userId"),
            accountButton: {
                enregistrer: "Enregistrer",
                desativer: "Desativer le compte",
            }
        }
    },
    mounted() {
        this.getUser()
    },
    methods: {
        selectFile( event ){
            this.account.photo = event.target.files[0];
        },
        
        modifyProfil(){
            const formData = new FormData()
            formData.append('password', this.account.password);
            formData.append('image', this.account.photo);

            console.log('test password', formData.get("password"))
            console.log('test photo', formData.get("photo"))

            fetch(`http://localhost:3000/api/auth/${ this.userId }`, { 
                method: 'PUT',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                    'Accept': 'application/json',
                },
                body: formData 
            })
            .then(res => res.json())
            .then(data => {
                this.getUser()
                console.log(data)
            })
            .catch(error => console.log(error))
        },

        getUser(){
            fetch(`http://localhost:3000/api/auth/${ this.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(data => {
                data.password = "";
                this.account = data
                console.log(data)
            })
            .catch(error => console.log(error))

        },
        
        deleteOneUser(){
            let supprConfirm = confirm('Vous êtes sur de supprimer votre compte')
            if(supprConfirm == true){
                fetch(`http://localhost:3000/api/auth/${ this.userId }`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'basic '+ localStorage.getItem('token'),
                },
            })
            .then(res => res.json())
            .then(() => {
                this.$router.replace("/")
                localStorage.clear()
                alert( 'Cliquez ok pour supprimer' );
            })
            .catch(error => console.log(error))
            }
        }
    },
}
</script>
<style scoped>
.bgBody {
    height: 100vh;
    width: 100%;
    padding-top: 5rem;
    background-color: #1b1b1b;
    color: #d8d8d8;
    font-family: 'Roboto';
}
.wrap_containerProfil {
    width: 100%;
    border-radius: 20px;
    max-width: 400px;
    /* background: -webkit-linear-gradient(left, #2f1533, #6d1c42); */
    background: -webkit-linear-gradient(right, #575757, #000000);
}
.iconImage{
    padding-top: 2rem;
    cursor: pointer;
}
.img_user_circle {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    object-fit: cover;
}
input[type="file"] {
    display: none;
}
label[for="choose_file_profil"] {
    display: flex;
    justify-content: center;
    font-size: 3rem;
    padding-bottom: 1rem;
    transform: scale(1);
    transition: 0.2s;
}

.infUser{
    position: relative;
    margin-top: 3rem;
    padding: 10px 10px ;
    border-radius: 15px;
    border: 0.5mm ridge #333333;
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
.btn_compte {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem 4rem 0;
    transform: scale(1);
    transition: 0.2s;
}
.btn_compte button {
     width: 100%;
    padding: 6px 0;
    border: none;
    border-radius: 15px;
    background: linear-gradient(to right, #ff105f, #ffad06);
}
.btn_compte:hover {
    transform: scale(1.1);
}
#btn_sumitProfil {
    padding: 4px 12px;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    transform: scale(1);
    transition: 0.2s;
    background: linear-gradient(to right, #8f0030, #7c7c7c);
}

#btn_sumitProfil:hover {
    transform: scale(1.1);
}

</style>