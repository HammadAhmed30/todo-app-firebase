import React, { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { FcGoogle } from "react-icons/fc";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "@/firebase/auth";
import Link from "next/link";


// Providers
const provider = new GoogleAuthProvider();



const LoginForm = () => {
    // States
    const [useremail, setUseremail] = useState(null);
    const [password, setPassword] = useState(null);
    const [message, setMessage] = useState("");

    // Create Intenses
    const router = useRouter()

    // useAuth
    const {authUser, isLoading} = useAuth()

    // Functions
    const loginButtonHandler = async () => {
        if (!useremail || !password) {
            return;
        }
        try {
            const {user} = await signInWithEmailAndPassword(auth, useremail, password);
        } catch (error) {
            setMessage("Error Occured while login");
        }
    };

    const loginWithGoogle = async () =>{
        try{

            const {user} = await signInWithPopup(auth,provider);
        }
        catch(error){
            console.error(error)
        }
    }

    // useEffect
    useEffect(()=>{
        if(!isLoading && authUser){
            router.push("/")
        }
    },[authUser, isLoading])
    return (
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Login</h1>
                    <p className="mt-6 ml-1">
                        Don't have an account ?{" "}
                        <Link href={"/register"} className="underline hover:text-blue-400 cursor-pointer">
                            Sign Up
                        </Link>
                    </p>

                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group" onClick={loginWithGoogle}>
                        <FcGoogle size={22} />
                        <span className="font-medium text-black group-hover:text-white">
                            Login with Google
                        </span>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e) => setUseremail(e.target.value)}
                            />
                        </div>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={loginButtonHandler}
                            className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                        >
                            Sign in
                        </button>
                    </form>
                    {message && <h1 className="font-[600] text-[white] text-center mt-[20px] bg-[red] py-[10px] rounded-full">
                        {message}
                    </h1>}
                </div>
            </div>
            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    );
};

export default LoginForm;
