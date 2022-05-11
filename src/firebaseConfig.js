import {getAuth} from 'firebase/auth'
import {getFirestore} from'firebase/firestore'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDgO8hZTdJC3IVuPkfTQmBR6bGWqOauPaA",
  authDomain: "the-club-1.firebaseapp.com",
  projectId: "the-club-1",
  storageBucket: "the-club-1.appspot.com",
  messagingSenderId: "397343661835",
  appId: "1:397343661835:web:b60d874212210b5a97cc0e",
  measurementId: "G-S79T0VC17R"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

