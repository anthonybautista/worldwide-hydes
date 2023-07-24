// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: process.env.DB,
    apiKey: process.env.KEY,
    authDomain: process.env.AUTH,
    projectId: "ww-hydes",
    storageBucket: process.env.STORAGE,
    messagingSenderId: process.env.SENDER,
    appId: process.env.APPID,
    measurementId: process.env.MID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);