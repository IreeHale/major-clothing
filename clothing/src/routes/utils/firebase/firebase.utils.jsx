import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDn74pi70NBNN82bNk3HLY7z5PAaH6oeCE",
    authDomain: "major-clothing-db.firebaseapp.com",
    projectId: "major-clothing-db",
    storageBucket: "major-clothing-db.appspot.com",
    messagingSenderId: "541576263737",
    appId: "1:541576263737:web:1072e948783968bc7db5e8"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:"select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

        if(!userSnapshot.exists()) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();
    
            try{
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt
                });
            } catch (error) {
                console.log('error creating the user', error.message);
            }
        }

        return userDocRef
    };