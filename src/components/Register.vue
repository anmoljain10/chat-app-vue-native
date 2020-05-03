<template>
    <view>
         <view class="text-center">
            <text class="title">CHAT APP</text>
        <view>
        <text-input v-model="email" placeholder="Email" class = "message-box" />
        <text-input v-model="password" placeholder="Password" class = "message-box" />
        <text-input v-model="name" placeholder="Username" class = "message-box" />
        <touchable-opacity color="#0073e6" class="button-view" :on-press="()=>register(email,password,name)" :disabled="(email == '' || name == '' || password == '')">
            <text class="register-text">Register</text>
        </touchable-opacity>
        <button title="Login" class="button-style" :on-press="login"></button>
    </view>    
</template>

<script>

import { register } from '../firebaseModules/user-auth'

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
.register-view {

}
.message-box {
  background-color:white;
  padding:10;
  border-radius: 10;
  margin:5;
  width:350
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
    align-items: center;
    text-align: center
}
.button-view {
    background-color:#0059b3;
    padding:5;
    align-content: center;
    align-items: center;
    text-align:center;
    border-radius:15;
    margin:5
}
.register-text {
   font-size:20;
   color:white;
   font-weight:300
}
</style>