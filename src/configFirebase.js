import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyCr_IxjVzXOeSvt0jOZ12lwGoTu2RS6cV0",
    authDomain: "inforce-d83ef.firebaseapp.com",
    projectId: "inforce-d83ef",
    storageBucket: "inforce-d83ef.appspot.com",
    messagingSenderId: "1080313554564",
    appId: "1:1080313554564:web:1cd541972a2ef2b84104d1",
    measurementId: "G-SD5TH3ZX6L"
});

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;