import  firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "todo-list-aa15e.firebaseapp.com",
  projectId: "todo-list-aa15e",
  storageBucket: "todo-list-aa15e.appspot.com",
  messagingSenderId: "93276588683",
  appId: "1:93276588683:web:19e00cc274dccf099a628e"
};

firebase.initializeApp(firebaseConfig);

export default firebase