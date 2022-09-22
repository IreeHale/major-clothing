import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
     } from 'firebase/auth';
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

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

        if(!userSnapshot.exists()) {
            const { displayName, email } = userAuth;
            const createdAt = new Date();
    
            try{
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation,
                });
            } catch (error) {
                console.log('error creating the user', error.message);
            }
        }

        return userDocRef;
    };

    export const createAuthUserWithEmailAndPassword = async (email, password) => {
        if (!email || !password) return;
        return await createUserWithEmailAndPassword(auth, email, password);
    };


    export const signInAuthUserWithEmailAndPassword = async (email, password) => {
        if (!email || !password) return;
        return await signInWithEmailAndPassword(auth, email, password);
    };

    export const signOutUser = async () => await signOut(auth);

    export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);