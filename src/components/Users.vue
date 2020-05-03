<template>
    <view>
        <view class="justify-center">
            <view class="user-info">
                <image :source="require('../../assets/user-male.png')" class="profile-pic"/>
                <text class="text-bold">{{ userName }} </text>
            </view>
        <touchable-opacity :on-press="signOut" class="button-view">
          <text class="white-text">Logout</text>
        </touchable-opacity>
        </view>
          <text class="text-white">Contacts</text>
        <flat-list :data = 'users'
        :render-item= "(user) => renderUsers(user)"/>
          <view v-if="(signedIn == true)" class="logout">
      </view> 
    </view>
</template>

<script>
import { getUsers } from '../firebaseModules/user-auth';
import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

export default {
    data:function() {
        return {
            users:[]
        }
    },
    props:{
        setFriendUid:{
            Type:Function
        },
        userUid:{
            Type:String
        },
        userName:{
            Type:String
        },
        signedIn:{
            Type:String
        },
        goBack:{
            Type:Function
        },
        signOut:{
            Type:Function
        }
    },
    mounted:async function() {
        this.users = await getUsers(this.userUid);
    },
    methods:{
        renderUsers:function(user) {
            return(<TouchableOpacity style={{
                flexDirection:'row',
                padding:15,
                backgroundColor:'white',
                borderRadius:10,
                alignItems:'center',
                borderBottomWidth:1,
                borderTopWidth:1,
                margin:1

            }} onPress={()=>{
                this.setFriendUid(user.item.uid);
            }}>
                <Image source={require('../../assets/user-male.png')} style={{
                    width:40,
                    height:40,
                    marginRight:10
                }}/>
                <Text style={{
                    color:'black',
                    fontSize:15
                }}>{user.item.name}</Text>
            </TouchableOpacity>)
        }
    }
}
</script>

<style>
.text-bold {
    font-size:20;
    padding:10;
}
.justify-center {
    flex-direction:row; 
    text-align: center;
    align-items: center;
    justify-content: space-evenly;
    padding-top:20
}
.text-white {
    font-weight:bold;
    color:white;
    margin-bottom:10;
    font-size:20;
    align-items:center;
    padding:10
}
.profile-pic {
    width:60;
    height:60;
    padding:20
}
.user-info {
    justify-content: center;
    align-items: center
}
.button-view {
    background-color:#0059b3;
    padding:10;
    align-content: center;
    align-items: center;
    text-align:center;
    border-radius:10;
    margin:5
}
.logout {
  flex-direction: row;
  justify-content:space-around 
}
.white-text {
    color:white
}
</style>