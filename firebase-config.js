 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
