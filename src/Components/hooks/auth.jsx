import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "./../../lib/firebase.jsx"
import {useState} from "react";
import {DASHBOARD, LOGIN} from "../../lib/routes.jsx";
import {useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {setDoc, doc} from "firebase/firestore"

export function useAuth() {
    const [authUser, isLoading, error] = useAuthState(auth)
    return {user: authUser, isLoading, error}
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    const toast = useToast()
    const navigate = useNavigate()

    async function login({email, password, redirectTo = DASHBOARD}) {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: "Your are Logged in",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000
            })
            navigate(redirectTo)
        } catch
            (error) {
            toast({
                title: "Logging in failed",
                description: error.message,
                isClosable: true,
                status: "error",
                position: "top",
                duration: 5000,
            })
            setLoading(false)
            return false
        }

        setLoading(false)
        return true
    }

    return {login, isLoading}

}

export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    const navigate = useNavigate()
    const toast = useToast()

    async function logout() {
        if (await signOut()) {
            toast({
                title: "success log out ",
                status: "success",
                isClosable: true,
                position: 'top',
                duration: 5000,
            })
            navigate(LOGIN)
        }
    }

    return {logout, isLoading}
}

export function useRegister() {
    const {isLoading, setLoading} = useState()

    async function register({username, email, password, redirectTo = DASHBOARD}) {
        setLoading(true)
        const toast = useToast()
        const userNameExits = await isUsernameExits(username);
        if (userNameExits) {
            toast({
                title: " username already exits ",
                status: "error",
                isClosable: true,
                position: 'top',
                duration: 5000,
            })
            setLoading(false)
            return false
        } else {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password)
                await setDoc(doc(db, "users", res.user.uid()))
            } catch (e) {
                toast({
                    title: "error",
                    status: "error",
                    isClosable: true,
                    position: 'top',
                    duration: 5000,
                })
            }
        }
        setLoading(false)
    }

    return {register, isLoading}
}