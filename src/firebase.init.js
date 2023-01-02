// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,

    // apiKey: "AIzaSyC1iWp_2nzv4AeXVUbXCsnsH6QpmFNqtTg",
    // authDomain: "pbs-office-info.firebaseapp.com",
    // projectId: "pbs-office-info",
    // storageBucket: "pbs-office-info.appspot.com",
    // messagingSenderId: "147892014815",
    // appId: "1:147892014815:web:a3196f0040297cd9db636a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;