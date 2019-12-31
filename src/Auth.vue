<template>
  <view class="container">
    <!-- <text class="text-color-primary">Enter your Name</text>
    <text-input v-model="name" class="message-box"/>
     <text class="text-color-primary">Enter Message</text>
    <text-input v-model="text" class="message-box"/> -->
    <text-input v-model="email" placeholder="Email" class = "message-box" />
        <text-input v-model="password" placeholder="Password" class = "message-box" />
         <text-input v-model="name" placeholder="Username" class = "message-box" />
     <button title="Register" class="button-style" :on-press="()=>register(email,password,name)" :disabled="(email == '' || name == '' || password == '')"></button>
    <!-- <button title="Send Message" class="button-style" :on-press="()=>sendMessage(name,text)" :disabled="(text == '' || name == '')"></button> -->
       <flat-list :data='messages'
       :render-item= "(message) => renderMessage(message)"
       >
      </flat-list>
  </view>
</template>

<script>
import React from 'react'
import {sendMessage, getMessages } from '../send-message'
import {register, signIn } from '../user-auth'
import {Text,View,TouchableOpacity,Dimensions} from 'react-native'

export default {
  data:function(){
    return{
      email:'',
      password:'',
      name:'',
      text:'',
      messages:[]
    }
    
  },
  methods:{
    sendMessage:async function(name,text) {
      await sendMessage(name,text);
      await this.getMessages();
      this.text = '';
      this.name = '';
    },
    getMessages:async function() {
      this.messages = await getMessages();
    },
    renderMessage:function(message) {
      console.log(message);
      return(<View style={{
        backgroundColor:'white',
        width:Dimensions.get('screen').width/2,
        borderRadius:10,
        padding:10,
        margin:5
      }}>
      <Text style={{
        fontSize:15
      }}>{message.item.message}</Text>
       <Text style={{
         fontSize:10
       }}>{message.item.sender}</Text>
      </View>)
    },
    register:function(email,password,name) {
      register(email,password,name);
    }
  }
}
</script>

<style>
.container {
  background-color:#555;
  flex:1;
  padding-top:10
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
  margin:5
}
</style>
