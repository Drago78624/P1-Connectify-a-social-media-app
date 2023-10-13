import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmuMqj1aaaTQQqoOwb0SlVyHvvKxpz5ks",
  authDomain: "p1-connectify.firebaseapp.com",
  projectId: "p1-connectify",
  storageBucket: "p1-connectify.appspot.com",
  messagingSenderId: "924542778444",
  appId: "1:924542778444:web:43a7c25efcbf311e7848e9",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const db = getFirestore(app)
