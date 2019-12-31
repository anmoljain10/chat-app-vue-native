<template>
  <view class="container">
    <view v-if="(signedIn == true)" class="logout">
       <button v-if="(mode == 'app')" title="Back" :on-press="goBack"/>
       <button title="SignOut" :on-press="signOut"></button>
    </view>  
    <view v-if="(signedIn == true && mode === 'app')">
      <chat :userId="userUid" :friendId="friendId"/>
    </view>
    <view v-else-if="(signedIn == false && mode === 'signup')" class="sign-in-view">
       <register :login="login" :user-signed-in="userSignedIn" />
    </view>
     <view v-else-if="(signedIn == false && mode === 'signin')" class="sign-in-view">
       <sign-in :login="login"  :user-signed-in="userSignedIn"/>
    </view>
    <view v-else-if="(mode == 'dashboard')">
      <users :userUid="userUid" :set-friend-uid="setFriendUid" :user-name="userName"/>
    </view>
  </view>
</template>

<script>
import { sendMessage, getMessages } from './send-message'
import { register, signIn } from './user-auth'
import firebase from 'react-native-firebase'
import Users from './src/Users'
import Auth from './src/Auth'
import Chat from './src/Chat'
import Register from './src/Register'
import SignIn from './src/SignIn'

export default {
  components:{ Users, Chat, Register,SignIn },
  data:function(){
    return {
      email:'',
      password:'',
      name:'',
      signedIn:false,
      mode:'signin',
      userName:'',
      userUid:'',
      friendId:''
    } 
  },
  async mounted() {
    var that = this
     await firebase.auth().onAuthStateChanged(function(user){
      if (user) {
       console.log("user",user)
       that.userUid = user.uid
       that.userName = user.email
       that.mode = 'dashboard'
       that.signedIn = true
      }
      else {
         console.log("Loaded ***")
        that.mode = 'signin'
      }
    })
    console.log(this.signedIn,this.mode);
  },
  updated() {
    console.log(this.signedIn,this.userUid)
  },
  methods:{
    userSignedIn:function(registerSuccess) {
         this.signedIn = true
         this.userUid = registerSuccess.uid
         this.userName = registerSuccess.email
         this.mode = 'dashboard'
    },
    goBack:function() {
         this.mode = 'dashboard'
    },
    login:function() {
      if ( this.mode == 'signup' ) {
         this.mode = "signin"
      }
      else {
        this.mode = "signup"
      }
    },
    signIn:async function(email,password) {
     
      this.userUid = signedIn.uid;
      console.log(signedIn)
      if(signedIn) {
        this.signedIn = true
        this.userName = signedIn.email
        this.mode = 'dashboard'
      }
      else {
        this.signedIn = false
        this.mode = 'signin'
      }
     },
     setUserId:function(userId) {
       this.userUid = userId;
     },
     setFriendUid:function(friendId) {
       this.friendId = friendId;
       this.mode = 'app'
     },
     signOut:async function() {
       try {
        await firebase.auth().signOut();
        this.mode = 'signin'
        this.signedIn = false
        this.friendId = ''
        this.userUid = ''
        this.userName = ''
       }
       catch(e) {
         console.log(e)
       }
     }
  }
}
</script>

<style>
.container {
  background-color:#444;
  flex:1;
  padding-top:15;
  /* justify-content: center */
}
.text-color-primary {
  color: white;
  font-size:20
}
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
.logout {
  position:absolute;
  right:40;
  top:40
}
.sign-in-view {
  flex:1
}
</style>
