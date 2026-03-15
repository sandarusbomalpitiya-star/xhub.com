// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDcKP6qgb8EbLh-dDbR43g3KZmNFCv5xzg",
  authDomain: "bpgxhub.firebaseapp.com",
  projectId: "bpgxhub",
  storageBucket: "bpgxhub.firebasestorage.app",
  messagingSenderId: "781508153938",
  appId: "1:781508153938:web:aa716282bab0090e7cc58b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
