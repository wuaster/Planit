import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import { LOCALHOST } from 'react-native-dotenv'

export async function signOutUser() {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}

export function onFBLoginOrRegister() {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return Promise.reject(new Error('The user cancelled the request'));
      }
      // Retrieve the access token
      return AccessToken.getCurrentAccessToken();
    })
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
      var name = JSON.stringify(user.additionalUserInfo.profile.name);
      var email = JSON.stringify(user.additionalUserInfo.profile.email);
      var id = firebase.auth().currentUser.uid;
      var userInfo = {"name": name, "email": email, "id": id};
      var addUserEndPoint = `http://${LOCALHOST}:5000/user/addUser`;
      fetch(addUserEndPoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(userInfo)
      });

    })
    .catch((error) => {
      const { code, message } = error;
      alert(message);
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}

export function onGLoginOrRegister() {
    GoogleSignin.signIn()
    .then((data) => {
      // Create a new Firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then((user) => {
      // If you need to do anything with the user, do it here
      // The user will be logged in automatically by the
      // `onAuthStateChanged` listener we set up in App.js earlier
    })
    .catch((error) => {
      const { code, message } = error;
      // For details of error codes, see the docs
      // The message contains the default Firebase string
      // representation of the error
    });
}