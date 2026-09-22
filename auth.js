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


const auth = getAuth(app);
const db = getFirestore(app);


/* =====================================================
   UPDATE NAVBAR LOGIN STATE
===================================================== */

function updateNavbar(user, userData = null) {

    /*
       Login button
    */

    const loginLinks =
        document.querySelectorAll(
            'a[href="login.html"]'
        );


    /*
       Existing user menu
    */

    const existingUserMenus =
        document.querySelectorAll(
            ".firebase-user-menu"
        );


    if (user) {

        /* ---------------------------------------------
           USER IS LOGGED IN
        --------------------------------------------- */

        loginLinks.forEach(function(link) {

            link.style.display = "none";

        });


        existingUserMenus.forEach(function(menu) {

            menu.remove();

        });


        const nav =
            document.querySelector("nav");

        if (!nav) return;


        /*
           Find the navigation container.
        */

        const navContainer =
            nav.querySelector(
                ".nav-links"
            ) ||
            nav.querySelector(
                ".nav-menu"
            ) ||
            nav;


        /*
           Create logged-in user menu.
        */

        const userMenu =
            document.createElement("div");

        userMenu.className =
            "firebase-user-menu";


        userMenu.style.display =
            "flex";

        userMenu.style.alignItems =
            "center";

        userMenu.style.gap =
            "20px";

        userMenu.style.marginLeft =
            "10px";


        /*
           User name
        */

        const userName =
            document.createElement("span");

        userName.style.fontWeight =
            "bold";

        userName.style.color =
            "#176b4d";

        userName.style.whiteSpace =
            "nowrap";


        const displayName =
            userData?.fullName ||
            user.displayName ||
            user.email?.split("@")[0] ||
            "User";


        userName.innerHTML =
            "👤 " +
            displayName;


        /*
           Logout button
        */

        const logoutButton =
            document.createElement("button");

        logoutButton.textContent =
            "Logout";


        logoutButton.style.border =
            "none";

        logoutButton.style.borderRadius =
            "25px";

        logoutButton.style.padding =
            "12px 25px";

        logoutButton.style.background =
            "#176b4d";

        logoutButton.style.color =
            "white";

        logoutButton.style.fontSize =
            "16px";

        logoutButton.style.fontWeight =
            "bold";

        logoutButton.style.cursor =
            "pointer";


        logoutButton.onclick =
            async function() {

                try {

                    await signOut(auth);

                    window.location.href =
                        "index.html";

                }

                catch(error) {

                    console.error(
                        "Logout error:",
                        error
                    );

                }

            };


        userMenu.appendChild(
            userName
        );

        userMenu.appendChild(
            logoutButton
        );


        navContainer.appendChild(
            userMenu
        );

    }

    else {

        /* ---------------------------------------------
           USER IS LOGGED OUT
        --------------------------------------------- */

        loginLinks.forEach(function(link) {

            link.style.display =
                "inline-flex";

        });


        existingUserMenus.forEach(function(menu) {

            menu.remove();

        });

    }

}


/* =====================================================
   FIREBASE AUTH STATE
===================================================== */

onAuthStateChanged(
    auth,
    async function(user) {

        if (!user) {

            updateNavbar(
                null
            );

            return;

        }


        console.log(
            "Logged-in ReConnect user:",
            user.email
        );


        let userData = null;


        try {

            const userDoc =
                await getDoc(
                    doc(
                        db,
                        "users",
                        user.uid
                    )
                );


            if (userDoc.exists()) {

                userData =
                    userDoc.data();

            }

        }

        catch(error) {

            console.error(
                "Unable to load user profile:",
                error
            );

        }


        updateNavbar(
            user,
            userData
        );

    }
);
