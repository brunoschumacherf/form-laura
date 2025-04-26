import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: import.meta.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "brunoprofilepage.firebaseapp.com",
    projectId: "brunoprofilepage",
    storageBucket: "brunoprofilepage.appspot.com",
    messagingSenderId: "991761924358",
    appId: "1:991761924358:web:50222a6a75bc7d04a05e87",
    measurementId: "G-6X0F6QVQME"
  };
  


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, query, where, deleteDoc, doc };
