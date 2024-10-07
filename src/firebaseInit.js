import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuaO5f4wbb3QUVOx84YMTKauwKxfPdib4",
  authDomain: "blogs-6b0ac.firebaseapp.com",
  projectId: "blogs-6b0ac",
  storageBucket: "blogs-6b0ac.appspot.com",
  messagingSenderId: "277721126726",
  appId: "1:277721126726:web:b6c1bb79898c262ea47747"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
