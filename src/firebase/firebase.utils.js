import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDJHN1brlKSj3JRFKwrB44K1rFtF_M0ado",
  authDomain: "react-ecommerce-3ddd5.firebaseapp.com",
  databaseURL: "https://react-ecommerce-3ddd5-default-rtdb.firebaseio.com",
  projectId: "react-ecommerce-3ddd5",
  storageBucket: "react-ecommerce-3ddd5.appspot.com",
  messagingSenderId: "501297366248",
  appId: "1:501297366248:web:20e5d9c6a47a862c8d755d",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
