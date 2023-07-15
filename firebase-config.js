import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxvEtrM9JffnFbMR8Z4w5ITqVWsfibbpk",
  authDomain: "uoload-file.firebaseapp.com",
  projectId: "uoload-file",
  storageBucket: "uoload-file.appspot.com",
  messagingSenderId: "567008340209",
  appId: "1:567008340209:web:b3eb2ddcc64cd042626150"
};

// Initialize Firebase
const firebaseApplication = initializeApp(firebaseConfig);
const firebaseStorage = getStorage();
const firebaseDatabase = getDatabase();

export { firebaseStorage, firebaseDatabase };