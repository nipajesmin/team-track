import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
const auth = getAuth(app);

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic();

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
            setUser(currentUser);
            if (currentUser?.email) {
                // get token and store client side

                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false);// akhn dsi
                        }
                    })

            }
            else {
                // remover token from client side(maybe stored in local storage)
                localStorage.removeItem('access-token')
                setLoading(false);
            }

        })
        return () => {
            unSubscribe();
        }
    }
        , [axiosPublic])


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