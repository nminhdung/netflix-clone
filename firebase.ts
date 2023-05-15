// Import the functions you need from the SDKs you need


import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAQgZmX-xRhb5m8hb_WhtpW-Dz5qPzDWXU",

  authDomain: "netflix-clone-3ec6d.firebaseapp.com",

  projectId: "netflix-clone-3ec6d",

  storageBucket: "netflix-clone-3ec6d.appspot.com",

  messagingSenderId: "723376098569",

  appId: "1:723376098569:web:d7b5389d049cc4f62957d8",
};

// Initialize Firebase


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }