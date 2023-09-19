import { initializeApp } from "firebase/app";
import {getAuth} from"firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "fire-todo-c8513.firebaseapp.com",
  projectId: "fire-todo-c8513",
  storageBucket: "fire-todo-c8513.appspot.com",
  messagingSenderId: "1094615428516",
  appId: ""
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)