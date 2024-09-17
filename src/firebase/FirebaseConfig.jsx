// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaqtP_Ph9lr1l7zVR7C-KsJ390zAh1NMA",
  authDomain: "blog-web-6a610.firebaseapp.com",
  projectId: "blog-web-6a610",
  storageBucket: "blog-web-6a610.appspot.com",
  messagingSenderId: "29279254146",
  appId: "1:29279254146:web:1ec0cb69b36d416e03269b",
  measurementId: "G-XVXDZKVG06"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDb, auth, storage };

