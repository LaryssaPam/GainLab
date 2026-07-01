
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-kylcp8G2LFs4_qZ9cD5z7BdSlS7tOFY", // Mets ta vraie clé ici si tu l'as copiée dans ton bloc-notes
  authDomain: "gainlab-ac089.firebaseapp.com",
  projectId: "gainlab-ac089",
  storageBucket: "gainlab-ac089.appspot.com",
  messagingSenderId: "1024638540280",
  appId: "1:1024638540280:web:fe5b1819a969888c4a9e0d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);