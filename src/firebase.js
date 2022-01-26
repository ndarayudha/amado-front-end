// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIDqErSpPJ0pyKGOhwUWo8odl6iE8exys",
  authDomain: "hypoxia-app.firebaseapp.com",
  projectId: "hypoxia-app",
  storageBucket: "hypoxia-app.appspot.com",
  messagingSenderId: "377779886096",
  appId: "1:377779886096:web:cd5c1e2ab8dd9f485ad295",
  measurementId: "G-MJGVCBQKQY",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export { ref, uploadBytesResumable, getDownloadURL };
export default storage;
