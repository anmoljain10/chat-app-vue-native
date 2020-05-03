<template>
    <view class="sign-in-view">
        <view class="text-center">
            <text class="title">CHAT APP</text>
        <view>
        <text-input v-model="email" placeholder="Email" class = "message-box" />
        <text-input v-model="password" placeholder="Password" class = "message-box"  :secure-text-entry="true"/>
         <view v-if="(error!='')" class="error-window">
            <text class="error-text">*{{error}}</text>
        </view>   
        <touchable-opacity :on-press="()=>signIn()" class="button" :disabled="(email == '' || password == '')">
            <view class="button-view">
                <text class="login-text">Login</text>
            </view>
        </touchable-opacity>
            
        <button title="Register" class="button-style" :on-press="login"></button>
    </view>    
</template>
<script>

import { signIn } from '../firebaseModules/user-auth'

export default {
    data:function() {
        return {
            email:'',
            password:'',
            error:''
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
        signIn:async function() {
             var signedIn = await signIn(this.email,this.password);
             if(signedIn.errorMessage) {
                 console.log(signedIn.errorMessage)
                  this.error = signedIn.errorMessage;
             }
             else {
                 this.error = '';
                 this.userSignedIn(signedIn);
             }
        }
    }
}
</script>

<style scoped>
.sign-in-view {
  
}
.message-box {
  background-color:white;
  padding:10;
  border-radius: 10;
  margin:5;
  width:350
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
.login-text {
   font-size:20;
   color:white;
   font-weight:300
}
.title {
    color:#0059b3;
    font-style:bold;
    font-weight: 400;
    font-style: italic;
    font-size:30;
    margin:5
}
.text-center {
    align-items: center;
    text-align: center
}
.error-window {
    flex-direction: row;
    justify-content: center;
    padding:10
}
.error-text {
    font-size:15;
    color:red
}
</style>