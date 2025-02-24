import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase.init";
import { toast } from "react-toastify";
export const ContextProvider = createContext();

const Provider = ({ children }) => {
  const [userAcount, setUserAcount] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const provider = new GoogleAuthProvider();
  const signWithGoogle = () => signInWithPopup(auth, provider);

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => {
    return signOut(auth);
  };

  const updateUser = (name, photo) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserAcount(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const notifySuccess = (message) => {
    toast.success(`${message}! 🎉`, {
      position: "top-center",
      autoClose: 1000, // Closes in 1 seconds
      theme: "dark",
    });
  };

  const notifyError = (message) => {
    toast.error(`${message}! ❌`, {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  };

  const notifyWarning = (message) => {
    toast.error(`${message}! ⚠️`, {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const authInfo = {
    userAcount,
    createUser,
    signInUser,
    signOutUser,
    updateUser,
    signWithGoogle,
    resetPassword,
    loading,
    notifySuccess,
    notifyError,
    notifyWarning,
  };

  return (
    <ContextProvider.Provider value={authInfo}>
      {children}
    </ContextProvider.Provider>
  );
};

export default Provider;
