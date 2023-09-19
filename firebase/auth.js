import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth"
import { auth } from "./firebase";


const AuthContext = createContext({
    authUser: null,
    isLoading: true
})


export default function authFirebase() {

    const [authUser, setAuthUser] = useState(null)
    const [isLoading, setLoading] = useState(true)

    const clear = () => {
        setAuthUser(null)
        setLoading(false)
    }

    const authHandler = async (user) => {
        setLoading(true)

        if (!user) {
            clear()
            return;
        }
        setAuthUser({
            uid: user.uid,
            username: user.displayName,
            email: user.email
        })
        setLoading(false)
    }
    const signOutHandler = () => {
        authSignOut(auth).then(() => clear())
    }

    useEffect(() => {
        const unsubscribedauth = onAuthStateChanged(auth, authHandler)
        return () => unsubscribedauth()
    }, [])

    return {
        authUser,
        setAuthUser,
        isLoading,
        signOutHandler
    }
}


export const AuthUserProvider = ({ children }) => {

    const auth = authFirebase()

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)