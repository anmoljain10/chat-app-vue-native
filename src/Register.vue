<template>
    <view class="register-view">
         <view class="text-center">
            <text class="title">CHAT APP</text>
        <view>
        <text-input v-model="email" placeholder="Email" class = "message-box" />
        <text-input v-model="password" placeholder="Password" class = "message-box" />
        <text-input v-model="name" placeholder="Username" class = "message-box" />
        <button title="Register" color="#0073e6" class="button-style" :on-press="()=>register(email,password,name)" :disabled="(email == '' || name == '' || password == '')"></button>
        <button title="Login" class="button-style" :on-press="login"></button>
    </view>    
</template>

<script>

import { register } from '../user-auth'

export default {
    data:function() {
        return{
            email:'',
            password:'',
            name:''
        }
    },
    props:{
        userSignedIn:{
            Type:Function
        },
        login:{
            Type:Function
        }
    },
    methods:{
         register:function(email,password,name) {
            var registerSuccess = register(email,password,name);
       if(registerSuccess) {
         this.userSignedIn(registerSuccess)  
       }
    },
    }
}
</script>

<style scoped>
.button-style {
  background-color: red;
  color:white
}
.message-box {
  background-color:white;
  padding:10;
  border-radius: 10;
  margin:5
}
.register-view {
    flex:1;
    justify-content: center
}
.title {
    color:white;
    font-style: italic;
    font-size:30;
    margin:5
}
.text-center {
    text-align: center
}
</style>