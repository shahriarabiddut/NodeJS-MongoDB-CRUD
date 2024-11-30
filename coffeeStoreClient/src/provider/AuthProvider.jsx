import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config';
import Swal from 'sweetalert2'

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  //Sweet Alert Modal
  const showModal = (title,message,type)=>{
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonText: 'Close'
    })
  }
  // Create New User
  const createNewUser = (email,password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password);
  }
  // Add Data Of User
  const updateUserProfile = (updatedData)=>{
    return updateProfile(auth.currentUser,updatedData)
  }
  // Login
  const signIn = (email,password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password);
  }
  // Logout
  const logOut = ()=>{
    setLoading(true);
    showModal('See You','Logged Out SuccessFully!','success')
    return signOut(auth);
  }
  const authInfo = {
    user,setUser,loading,showModal,createNewUser,updateUserProfile,signIn,logOut,
  }
  useEffect(()=>{
        
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser);
        setLoading(false);
    })
    return () => {
        unsubscribe()
    };
  },[]);
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider