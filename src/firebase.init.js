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

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC6xMmAsZxxSazO76V6PftEFVQxmHwDmVo",
//   authDomain: "pbs-info.firebaseapp.com",
//   projectId: "pbs-info",
//   storageBucket: "pbs-info.appspot.com",
//   messagingSenderId: "88895302306",
//   appId: "1:88895302306:web:a3996510c75e46432305fb"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);