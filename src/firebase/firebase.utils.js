import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyC9r0z8xOMa1w40i4kvLWKQcAyaEKYNR_o",
    authDomain: "printdesignwebsite.firebaseapp.com",
    projectId: "printdesignwebsite",
    storageBucket: "printdesignwebsite.appspot.com",
    messagingSenderId: "334045267218",
    appId: "1:334045267218:web:5c1869a7f78bb7fa335fcb",
    measurementId: "G-KD1HSGHBLS"
};

firebase.initializeApp(config)

export const firestore = firebase.firestore()
export const storage = firebase.storage()