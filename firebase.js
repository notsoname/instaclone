import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyD3xGgSdw2CYll4ZAdCsB9RUaV99mhu7_c",
    authDomain: "instagramclone-5b4a8.firebaseapp.com",
    databaseURL: "https://instagramclone-5b4a8-default-rtdb.firebaseio.com",
    projectId: "instagramclone-5b4a8",
    storageBucket: "instagramclone-5b4a8.appspot.com",
    messagingSenderId: "1001185084101",
    appId: "1:1001185084101:web:5d28be08e2120ee9d626ac",
    measurementId: "G-61K9EFEQ79"
})


export const auth = app.auth()
/* export const storage = app.storage() */
export const db = app.firestore()
export default app