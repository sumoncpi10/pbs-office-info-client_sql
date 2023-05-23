// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6xMmAsZxxSazO76V6PftEFVQxmHwDmVo",
    authDomain: "pbs-info.firebaseapp.com",
    projectId: "pbs-info",
    storageBucket: "pbs-info.appspot.com",
    messagingSenderId: "88895302306",
    appId: "1:88895302306:web:a3996510c75e46432305fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;