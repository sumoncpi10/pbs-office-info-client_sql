// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_APIKEY,
    // authDomain: process.env.REACT_APP_AUTHDOMAIN,
    // projectId: process.env.REACT_APP_PROJECTID,
    // storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    // appId: process.env.REACT_APP_APPID,

    apiKey: "AIzaSyAj-VnYflUoE2009hL6X2bA5dGMaX1Ubwg",
    authDomain: "pbs-inf.firebaseapp.com",
    projectId: "pbs-inf",
    storageBucket: "pbs-inf.appspot.com",
    messagingSenderId: "1034888448889",
    appId: "1:1034888448889:web:96e0bf241de12c9d61fda8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;