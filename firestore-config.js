import * as firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk7Wtk3VLVHZcgVrmLZlSWjn8kBTqu3-8",
  authDomain: "tuto-react-firebase.firebaseapp.com",
  databaseURL: "https://tuto-react-firebase.firebaseio.com",
  projectId: "tuto-react-firebase",
  /*storageBucket: "tuto-react-firebase.appspot.com",
  messagingSenderId: "31021038196",
  appId: "1:31021038196:web:6bcbd4f30b5c5c1da6ef21"*/
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();