// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7kPWGY8xSJUv-3AmmwQBqAjx8rhWHIEo",
    authDomain: "todo-app-80216.firebaseapp.com",
    projectId: "todo-app-80216",
    storageBucket: "todo-app-80216.appspot.com",
    messagingSenderId: "780384892290",
    appId: "1:780384892290:web:c99d8cc24b85354fbf8b9b",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const database = getFirestore(firebaseapp);

export default database;