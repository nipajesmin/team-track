import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
const auth = getAuth(app);

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // const signInWithGoogle = () => {
    //     return signInWithPopup(auth, GoogleAuthProvider);
    // }
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider(); // Initialize the provider
        return signInWithPopup(auth, provider);
    };
    

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)

    }

    useEffect(() => {
        // const unSubscribe = onAuthStateChanged(auth, async currentUser => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            //  console.log('current User', currentUser);

            // if (currentUser?.email) {
            setUser(currentUser);
            //     const { data } = await axios.post('https://restaurant-management-server-tawny.vercel.app/jwt', {
            //         email: currentUser?.email
            //     },
            //         {
            //             withCredentials: true
            //         }

            //     )

            // }
            // else{
            //     setUser(currentUser);  
            //     const { data } = await axios.get('https://restaurant-management-server-tawny.vercel.app/logout', 
            //         {
            //             withCredentials: true
            //         }

            //     )
            // }
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }
        , [])


    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        signOutUser,
        updateUserProfile,
        signInWithGoogle

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;