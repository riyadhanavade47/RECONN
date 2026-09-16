// ReConnect Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyDd8vouJPcPY4didR5mAuFrFcLd7wowyTc",
    authDomain: "reconnect-4caba.firebaseapp.com",
    projectId: "reconnect-4caba",
    storageBucket: "reconnect-4caba.firebasestorage.app",
    messagingSenderId: "246775765171",
    appId: "1:246775765171:web:a276d37975ae888ad678c6",
    measurementId: "G-QH1MH2BHGY"
};

const app = initializeApp(firebaseConfig);

export { app };
