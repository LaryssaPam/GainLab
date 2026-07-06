import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-kylcp8G2LFs4_qZ9cD5z7BdSlS7tOFY", 
  authDomain: "gainlab-ac089.firebaseapp.com",
  projectId: "gainlab-ac089",
  storageBucket: "gainlab-ac089.appspot.com",
  messagingSenderId: "1024638540280",
  appId: "1:1024638540280:web:fe5b1819a969888c4a9e0d"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Les exports pour ton projet GainLab
export const db = getFirestore(app);

// Cette ligne fonctionne parfaitement sur le navigateur web !
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence
});