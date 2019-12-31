<template>
    <view>
        <view class="justify-center">
            <text class="text-bold">Welcome,{{ userName }} </text>
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
                margin:3,
                alignItems:'center'

            }} onPress={()=>{
                this.setFriendUid(user.item.uid);
            }}>
                <Image source={require('../assets/user-male.png')} style={{
                    width:30,
                    height:30,
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
    color:white;
}
.justify-center {
    text-align: center
}
.text-white {
    font-weight:bold;
    color:white;
    margin-bottom:10;
    align-items:center;
    padding:10
}

</style>