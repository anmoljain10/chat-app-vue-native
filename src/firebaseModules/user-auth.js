import firebase from 'react-native-firebase'

async function register(email, password, name) {
    try {
        const registered = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (registered) {
           await addUser(registered,name);
           return registered.user;
        }
        else {
            return null;
        }
    } catch (e) {
        return null;
    }
}

async function signIn(email,password) {
    console.log(email,password);
    try {
        const signedIn = await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log(signedIn);
        if (signedIn) {
            return signedIn.user;
        }
    } catch (e) {
        console.log(e.message);
        return {
            errorMessage:e.message
        }
    }
}
async function addUser(userObject, name) {
     firebase.firestore().collection('users').doc().set({ 
        uid:userObject.user.uid,
        name:name,
        email:userObject.user.email
    }).then(res=>console.log(res));
}
async function getUsers(userId) {
    console.log(userId)
    var users = [];
    firebase.firestore().collection('users').get().then(function(querySnapshot) {
        querySnapshot.forEach(function (doc) {
            if(doc.data().uid != userId)
            users.push(doc.data());
        })
    }).then(res=>console.log(res)).catch(err=>console.log(err));
    console.log(users);
    return users;
}
async function getUserName(userId) {
    var that = this;
    await firebase.firestore().collection('users').where("uid","==",userId).get().then(function(querySnapshot){
        querySnapshot.forEach(function (doc) {
           console.log(doc);
           that.user = doc.data().name
           console.log(that.user);
        })
    })
    console.log(that.user);
    return that.user;
}
export {register, signIn, getUsers, getUserName}
