type Props = {
};
import { FcGoogle } from "react-icons/fc";
import {useMutation } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner'

type Input = {
    mail : string,
    password : string,
}

export default function Login({}: Props) {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/");
        }
    }, []);

    

    const loginMutation = useMutation({
        mutationFn: async (input : Input) => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/expenses/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(input)
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        },

        onSuccess: (data) => {
            localStorage.setItem(
                "token",
                data.token
            );

            navigate("/");
        }
    });

    const handleSumbit = async (e : React.SubmitEvent) => {
        e.preventDefault();

        await loginMutation.mutateAsync({mail, password});
    };  

    return (
        <div className="Login">
            {
                loginMutation.isPending ?
                <>
                <Spinner></Spinner>
                </>
                :
                <>
                    <nav>
                        <span className="Title">PFT</span>

                    </nav>
                    <div className="loginBoard">
                        <div className="loginBoardContainer">
                            <div className="loginContent">
                                <div className="loginHeading">
                                    <p><span className="subheading">Create an Account</span></p>
                                    <p>Welcome Back Don't have an account? <Link to="/Sign">Sign Up</Link></p>
                                </div>
                                <form onSubmit={handleSumbit}>
                                    <label htmlFor="email">Email
                                        <input 
                                            type="email" 
                                            name="email" 
                                            id="email" 
                                            placeholder="xyz@email.com"
                                            value={mail}
                                            onChange={e => setMail(e.currentTarget.value)}
                                        />
                                    </label>
                                    <label htmlFor="password">Password
                                        <input 
                                            type="password" 
                                            name="password" 
                                            id="password" 
                                            placeholder="Enter Your Password"    
                                            value={password}
                                            onChange={e => setPassword(e.currentTarget.value)}    
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        disabled={loginMutation.isPending}
                                    >
                                        {
                                            loginMutation.isPending
                                                ? "Logging in..."
                                                : "Login"
                                        }
                                    </button>
                                </form>
                                <div className="altLogin">
                                    <p className="altLoginText">Or Register With</p>
                                    <button className="LoginGoogle">    
                                        <FcGoogle size={20} />
                                        Continue with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}
