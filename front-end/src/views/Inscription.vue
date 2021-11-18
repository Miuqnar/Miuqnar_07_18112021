<template>
    <div class="mx-2 ">
       <h1 v-bind:class="{p_class: compClass}">{{ msg.menssage }}</h1>

       <input type="text" v-on:keyup.enter="val()" v-model="msVal" >
       <ul>
           <li v-bind:class="{p_class1: compClass}"  v-for="item in valor" :key="item">{{ item }}</li>
       </ul>
       
    </div>
    
</template>
<script>
export default {
    name: "Inscription",
    data() {
        return {
            isClor: true,
            msg: {
                menssage: "Hello World",
                
            },
            msVal: "",
            valor: []
        }
    },
    methods: {
        compClass(show) {
            this.isClor = show
        },
        val(){
            this.valor.push(this.msVal);
            this.msVal = ""
        }
    },
        
}
</script>
<style>
.p_class {
    color: red;
    font-size: 100px;
}
.p_class1 {
    color: green;
    font-size: 20px;
}

</style>