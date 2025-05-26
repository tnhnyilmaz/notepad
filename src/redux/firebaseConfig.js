// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcJnciBaupOk7Da5MOam2vF3TTNZWAgLw",
    authDomain: "notepad-9361a.firebaseapp.com",
    projectId: "notepad-9361a",
    storageBucket: "notepad-9361a.firebasestorage.app",
    messagingSenderId: "124345785116",
    appId: "1:124345785116:web:53d2080b16d336d7b778d9",
    measurementId: "G-TJ8ZRQ8V02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);