import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyADbsAxb1ogmbcI2RjX7UJQ-7CTs7aaho0",
    authDomain: "bgx-hub.firebaseapp.com",
    databaseURL: "https://bgx-hub-default-rtdb.firebaseio.com",
    projectId: "bgx-hub",
    storageBucket: "bgx-hub.firebasestorage.app",
    messagingSenderId: "872433084169",
    appId: "1:872433084169:web:3be5386fc5a77d30d115d8",
    measurementId: "G-8VN47CC4L6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
