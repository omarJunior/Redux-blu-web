import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyASjEsWqYn3sFzvxC3fShQrcNQNEZqbfFE",
    authDomain: "crud-udemy-react-8abcb.firebaseapp.com",
    projectId: "crud-udemy-react-8abcb",
    storageBucket: "crud-udemy-react-8abcb.appspot.com",
    messagingSenderId: "39344057388",
    appId: "1:39344057388:web:fbec61f6c4b598d0283589"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()

  export { auth, firebase }