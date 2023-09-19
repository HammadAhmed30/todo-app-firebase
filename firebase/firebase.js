import { initializeApp } from "firebase/app";
import {getAuth} from"firebase/auth";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDLzqnm7RzsPn4xq3El-GlINcuX3iiyeh8",
  authDomain: "fire-todo-c8513.firebaseapp.com",
  projectId: "fire-todo-c8513",
  storageBucket: "fire-todo-c8513.appspot.com",
  messagingSenderId: "1094615428516",
  appId: "1:1094615428516:web:bb3b8b86bdaaf9cc056531"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)