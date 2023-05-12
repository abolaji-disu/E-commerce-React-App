import {initializeApp} from 'firebase/app';
import {
    getAuth,
   signInWithRedirect, 
   signInWithPopup, 
   GoogleAuthProvider
  } from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe_X08I-F_aK5YsyQY3Pmwd9WCddHKDu8",
  authDomain: "crown-clothing-db-18b2d.firebaseapp.com",
  projectId: "crown-clothing-db-18b2d",
  storageBucket: "crown-clothing-db-18b2d.appspot.com",
  messagingSenderId: "985733504696",
  appId: "1:985733504696:web:3db31e2fca2107ad471e4d",
  measurementId: "G-MQ7S9E57FB",
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt:"select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if (!userSnapShot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })
    } catch (error){
      console.log("error creating the user", error.message);
    }

  }

  return userDocRef;

  // if user data does not exist

}