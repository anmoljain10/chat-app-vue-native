<template>
    <view>
        <view class="justify-center">
            <view class="user-info">
                <image :source="require('../assets/user-male.png')" class="profile-pic"/>
                <text class="text-bold">{{ userName }} </text>
            </view>
            <text class="text-white">Contacts</text>
        </view>
        <flat-list :data = 'users'
        :render-item= "(user) => renderUsers(user)"/>
    </view>
</template>

<script>
import { getUsers } from '../user-auth';
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
                <Image source={require('../assets/user-male.png')} style={{
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
    text-align: center;
    align-items: center;
}
.text-white {
    font-weight:bold;
    color:white;
    margin-bottom:10;
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
</style>