import firebase from "firebase";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBny2Rh1f8dSJ2M2FP4zo1mZDFbOfQDr5Y",
  authDomain: "fir-next-11648.firebaseapp.com",
  projectId: "fir-next-11648",
  storageBucket: "fir-next-11648.appspot.com",
  messagingSenderId: "1063325370887",
  appId: "1:1063325370887:web:29e3ec73ba97a792bb78a2",
};

export default function firebaseClient() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
}
