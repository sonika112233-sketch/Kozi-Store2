import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtBVRTEGrd3dw2qufhZdusUlj2bqYWxAY",
  authDomain: "shoe-shop-v3-74bbb.firebaseapp.com",
  projectId: "shoe-shop-v3-74bbb",
  storageBucket: "shoe-shop-v3-74bbb.firebasestorage.app",
  messagingSenderId: "132331429990",
  appId: "1:132331429990:web:d6b1b6e03baf44ea030da7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);