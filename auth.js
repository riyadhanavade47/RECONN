// ==========================================
// ReConnect - Firebase Authentication
// ==========================================

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import { app } from "./firebase-config.js";


// ==========================================
// INITIALIZE FIREBASE AUTH
// ==========================================

const auth = getAuth(app);


// ==========================================
// UPDATE NAVBAR
// ==========================================

function updateNavbar(user) {

    const loginLink = document.getElementById("loginLink");
    const logoutButton = document.getElementById("logoutButton");
    const userDisplay = document.getElementById("userDisplay");

    console.log("Updating navbar. User:", user);


    if (user) {

        // -------------------------------
        // USER IS LOGGED IN
        // -------------------------------

        if (loginLink) {
            loginLink.style.display = "none";
        }

        if (userDisplay) {

            userDisplay.textContent =
                "👤 " + (user.email || "User");

            userDisplay.style.display = "inline-block";
        }

        if (logoutButton) {
            logoutButton.style.display = "inline-block";
        }

    } else {

        // -------------------------------
        // USER IS LOGGED OUT
        // -------------------------------

        if (loginLink) {
            loginLink.style.display = "inline-block";
        }

        if (userDisplay) {

            userDisplay.textContent = "";

            userDisplay.style.display = "none";
        }

        if (logoutButton) {
            logoutButton.style.display = "none";
        }
    }
}


// ==========================================
// CHECK FIREBASE LOGIN STATE
// ==========================================

onAuthStateChanged(auth, (user) => {

    console.log("Firebase authentication state changed.");

    updateNavbar(user);

});


// ==========================================
// LOGOUT
// ==========================================

window.logoutUser = async function () {

    try {

        await signOut(auth);

        console.log("User logged out successfully.");

        // Firebase will automatically update
        // the navbar through onAuthStateChanged.

        window.location.href = "index.html";

    }

    catch (error) {

        console.error("Logout error:", error);

        alert(
            "Unable to log out. Please try again."
        );

    }
};


// ==========================================
// EXPORT AUTH
// ==========================================

export { auth };
