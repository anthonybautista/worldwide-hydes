// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: "https://ww-hydes-default-rtdb.firebaseio.com/",
    apiKey: "AIzaSyCRBHZ5msgyrTHX8RqotDWtuUjTxF3NoUk",
    authDomain: "ww-hydes.firebaseapp.com",
    projectId: "ww-hydes",
    storageBucket: "ww-hydes.appspot.com",
    messagingSenderId: "505629824705",
    appId: "1:505629824705:web:cf952d5fe731d39183e640",
    measurementId: "G-N659MQ8GFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);