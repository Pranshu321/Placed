import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {initializeApp} from 'firebase/app';
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCY2NUgGB2MTm7GVlgDEFpHmGowj0VUqzA",
  authDomain: "placed-52711.firebaseapp.com",
  projectId: "placed-52711",
  storageBucket: "placed-52711.appspot.com",
  messagingSenderId: "132585018710",
  appId: "1:132585018710:web:f9c36e7370e00c04a6f2f7"
};



// Initialize Firebase

const app = initializeApp(firebaseConfig);
var auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getFirestore();
const storage = getStorage();
export {auth , provider, database, storage};

