import firebase from "firebase/compat/app"
import "firebase/compat/database";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDZjdJroQrV9DIoQksMt9AkMAxoES595JI",
    authDomain: "react-app-88b1e.firebaseapp.com",
    databaseURL: "https://react-app-88b1e-default-rtdb.firebaseio.com",
    projectId: "react-app-88b1e",
    storageBucket: "react-app-88b1e.appspot.com",
    messagingSenderId: "299656542440",
    appId: "1:299656542440:web:066264b978d01090c5f15d"
  };
const fireDb = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(fireDb)
export const googleProvider = new GoogleAuthProvider(fireDb)
export const database = getFirestore(fireDb)
export default fireDb.database().ref();
