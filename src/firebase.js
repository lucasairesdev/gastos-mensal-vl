// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVI5L6xzGbaAgqREm6q3i71BPM6Qg8au4",
  authDomain: "controle-de-gastos-vl.firebaseapp.com",
  projectId: "controle-de-gastos-vl",
  storageBucket: "controle-de-gastos-vl.firebasestorage.app",
  messagingSenderId: "873425762214",
  appId: "1:873425762214:web:fbd57aa738991cdc9e4167",
  measurementId: "G-Y2LHFQ9N4T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
