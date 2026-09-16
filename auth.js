// ==========================================
// ReConnect - Firebase Authentication
// ==========================================

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { app } from "./firebase-config.js";


// Initialize Firebase Authentication
const auth = getAuth(app);


// ==========================================
// CHECK LOGIN STATUS
// ==========================================

onAuthStateChanged(auth, (user) => {

    const loginLink = document.getElementById("loginLink");
    const logoutButton = document.getElementById("logoutButton");
    const userDisplay = document.getElementById("userDisplay");

    if (user) {

        // User is logged in

        if (loginLink) {
            loginLink.style.display = "none";
        }

        if (logoutButton) {
            logoutButton.style.display = "inline-block";
        }

        if (userDisplay) {
            userDisplay.textContent =
                user.email || "Logged in";
        }

    } else {

        // User is not logged in

        if (loginLink) {
            loginLink.style.display = "inline-block";
        }

        if (logoutButton) {
            logoutButton.style.display = "none";
        }

        if (userDisplay) {
            userDisplay.textContent = "";
        }

    }

});


// ==========================================
// LOGOUT FUNCTION
// ==========================================

window.logoutUser = async function () {

    try {

        await signOut(auth);

        alert("You have been logged out.");

        window.location.href = "index.html";

    } catch (error) {

        console.error("Logout error:", error);

        alert("Unable to log out. Please try again.");

    }

};


// ==========================================
// EXPORT AUTH
// ==========================================

export { auth };