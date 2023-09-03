import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {auth, db} from "./../../lib/firebase.jsx"
import {useEffect, useState} from "react";
import {DASHBOARD, LOGIN} from "../../lib/routes.jsx";
import {useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {setDoc, doc, getDoc} from "firebase/firestore"
import IsUsernameExits from "../../utils/IsUsernameExits.jsx";

export function useAuth() {
    const [authUser, authLoading, error, ] = useAuthState(auth)
    const [isloading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function fetchData(){
            setIsLoading(true)
            const ref = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(ref);
            setUser(docSnap.data())
            setIsLoading(false)
        }
        if(!authLoading){
            if(authUser) fetchData()
            else{
                setIsLoading(false)
            }
        }
    }, [user, authLoading, error]);
    return {user: authUser, isloading, error}
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
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const toast = useToast()

    async function register({username, email, password, redirectTo = DASHBOARD}) {
        setLoading(true)
        const isUserNameExits = await IsUsernameExits(username);
        if (isUserNameExits) {
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
                await setDoc(doc(db, "users", res.user.uid), {
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    email: email,
                    avatar: '',
                    date: Date.now()
                });
                navigate(redirectTo)
            } catch (error) {
                toast({
                    title: "Sign Up failed",
                    description: error.messsage,
                    status: "error",
                    isClosable: true,
                    position: 'top',
                    duration: 5000,
                })
            } finally {
                setLoading(false)
            }
        }
        setLoading(false)
    }

    return {register, isLoading}
}