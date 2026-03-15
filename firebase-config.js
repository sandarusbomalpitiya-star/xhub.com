import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "Uvey5eC34kWTB8ZMkiB46ZNh8a12",
  authDomain: "bpgxhub.firebaseapp.com",
  projectId: "bpgxhub",
  storageBucket: "bpgxhub.appspot.com",
  messagingSenderId: "781508153938",
  appId: "1:781508153938:web:aa716282bab0090e7cc58b"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
