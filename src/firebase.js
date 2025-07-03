// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database"; // For Realtime DB
// import { getFirestore, collection, addDoc } from "firebase/firestore"; // For Firestore

const firebaseConfig = {
    apiKey: "AIzaSyD2vZR5Spl6XRLABbnzUrI00KiFFiD9RUY",
    authDomain: "reservation-system-4c789.firebaseapp.com",
    projectId: "reservation-system-4c789",
    storageBucket: "reservation-system-4c789.firebasestorage.app",
    messagingSenderId: "680483742243",
    appId: "1:680483742243:web:ec7879370e8d21c8030796",
    databaseURL: "https://reservation-system-4c789-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

// For Realtime Database
const db = getDatabase(app);

// For Firestore (if you prefer)
// const db = getFirestore(app);

export { db, ref, push, set }; // Realtime DB
// export { db, collection, addDoc }; // Firestore
