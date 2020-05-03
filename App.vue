<template>
<safe-area-view :style="{flex:1}">
     <image-background :source="require('./assets/chat2.png')" :style="{ flex: 1 }" >
  <view class="container">
    <view v-if="(signedIn == true && mode === 'app')" class="flex-1">
      <view v-if="(signedIn == true)" class="logout">
        <touchable-opacity :on-press="goBack" class="button-view">
          <text class="back-text">Back</text>
        </touchable-opacity>
      </view> 
      <chat 
      :userId="userUid" 
      :friendId="friendId"
      :go-back="goBack"
      :signed-in="signedIn"
      :sign-out="signOut"
      />
    </view>
    <view v-if="(signedIn == false && mode === 'signup')" class="sign-in-view">
       <register :login="login" :user-signed-in="userSignedIn" />
    </view>
     <view v-if="(signedIn == false && mode === 'signin')" class="sign-in-view">
       <sign-in :login="login"  :user-signed-in="userSignedIn"/>
    </view>
    <scroll-view v-if="(mode == 'dashboard')">
      <users
       :userUid="userUid"
       :set-friend-uid="setFriendUid"
       :user-name="userName"
       :go-back="goBack"
       :signed-in="signedIn"
       :sign-out="signOut"
        />
    </scroll-view>
 
  </view>
      </image-background>
</safe-area-view>
</template>

<script>
import { sendMessage, getMessages } from './src/firebaseModules/send-message'
import { register, signIn } from './src/firebaseModules/user-auth'
import firebase from 'react-native-firebase'
import { Users, Chat, Register, SignIn } from './src/components'

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
      isLoading:false,
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
        that.mode = 'signin'
      }
    })
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
  flex:1;
  padding-left:5;
  padding-right:5
}
.text-color-primary {
  color: white;
  font-size:20
}
.message-box {
  background-color:white;
  padding:10;
  border-radius: 10;
  margin:5
}
.sign-in-view {
  flex:1;
  justify-content: center
}
.justify-center {
  justify-content: center
}
.chat-view {
   flex:1;
}
.flex-1 {
  flex:1;
}
.back-text {
  font-size:16
}
</style>
