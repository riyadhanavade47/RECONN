// ==========================================
// ReConnect - Shared Firebase Authentication
// ==========================================

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

import { app } from "./firebase-config.js";


// ==========================================
// INITIALIZE
// ==========================================

const auth = getAuth(app);
const db = getFirestore(app);


// ==========================================
// UPDATE NAVBAR
// ==========================================

async function updateNavbar(user) {

    // Find Login link on ANY page
    const loginLinks =
        document.querySelectorAll(
            'a[href="login.html"]'
        );


    // Find existing user display
    let userDisplay =
        document.getElementById("userDisplay");


    // Find existing logout button
    let logoutButton =
        document.getElementById("logoutButton");


    // ======================================
    // LOGGED IN
    // ======================================

    if (user) {

        // Hide every Login link
        loginLinks.forEach(link => {

            link.style.display = "none";

        });


        // Create user display if page doesn't have it
        if (!userDisplay) {

            userDisplay =
                document.createElement("span");

            userDisplay.id =
                "userDisplay";

            userDisplay.style.cssText = `
                color: #176b4d;
                font-size: 14px;
                font-weight: 700;
                white-space: nowrap;
                display: inline-flex;
                align-items: center;
                gap: 6px;
            `;


            // Put it where the Login link was
            const firstLogin =
                loginLinks[0];


            if (firstLogin) {

                firstLogin.parentNode.insertBefore(
                    userDisplay,
                    firstLogin
                );

            }

        }


        // Create Logout button if page doesn't have it
        if (!logoutButton) {

            logoutButton =
                document.createElement("button");

            logoutButton.id =
                "logoutButton";

            logoutButton.textContent =
                "Logout";

            logoutButton.type =
                "button";

            logoutButton.style.cssText = `
                background: #176b4d;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                white-space: nowrap;
            `;


            // Put Logout after user name
            if (userDisplay) {

                userDisplay.parentNode.insertBefore(
                    logoutButton,
                    userDisplay.nextSibling
                );

            }

        }


        // ==================================
        // GET USER NAME FROM FIRESTORE
        // ==================================

        let displayName =
            user.email || "User";


        try {

            const userRef =
                doc(db, "users", user.uid);

            const userSnap =
                await getDoc(userRef);


            if (userSnap.exists()) {

                const data =
                    userSnap.data();


                displayName =
                    data.fullName ||
                    data.ngoName ||
                    data.collegeName ||
                    user.email ||
                    "User";

            }

        }

        catch (error) {

            console.log(
                "Could not load profile name:",
                error
            );

        }


        // Show user name
        userDisplay.innerHTML =
            "👤 " +
            escapeHTML(displayName);


        userDisplay.style.display =
            "inline-flex";


        // Show Logout
        logoutButton.style.display =
            "inline-block";


        // Logout action
        logoutButton.onclick =
            logoutUser;

    }


    // ======================================
    // LOGGED OUT
    // ======================================

    else {

        // Show Login links
        loginLinks.forEach(link => {

            link.style.display =
                "inline-block";

        });


        // Hide user
        if (userDisplay) {

            userDisplay.style.display =
                "none";

        }


        // Hide logout
        if (logoutButton) {

            logoutButton.style.display =
                "none";

        }

    }

}


// ==========================================
// LOGOUT
// ==========================================

async function logoutUser() {

    try {

        await signOut(auth);

        window.location.href =
            "index.html";

    }

    catch (error) {

        console.error(
            "Logout error:",
            error
        );

        alert(
            "Unable to log out. Please try again."
        );

    }

}


// Make available to HTML
window.logoutUser =
    logoutUser;


// ==========================================
// ESCAPE HTML
// ==========================================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ==========================================
// CHECK AUTH STATE
// ==========================================

onAuthStateChanged(
    auth,
    async (user) => {

        await updateNavbar(user);

    }
);


// ==========================================
// EXPORT
// ==========================================

export {
    auth
};
