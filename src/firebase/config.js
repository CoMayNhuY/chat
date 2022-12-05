import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API,
    authDomain: 'chat-firebase-97791.firebaseapp.com',
    projectId: 'chat-firebase-97791',
    storageBucket: 'chat-firebase-97791.appspot.com',
    messagingSenderId: '8767349814',
    appId: '1:8767349814:web:19829ef67230c01baf6497',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
export default firebase;
export const storage = getStorage();
