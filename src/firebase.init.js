// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { auth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABgRdTe4lz-taPEqxBvTGj4GFokgeS2nI",
    authDomain: "genius-car-services-9bb97.firebaseapp.com",
    projectId: "genius-car-services-9bb97",
    storageBucket: "genius-car-services-9bb97.appspot.com",
    messagingSenderId: "99481106069",
    appId: "1:99481106069:web:429d8076d3a02ea1c34d9c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;