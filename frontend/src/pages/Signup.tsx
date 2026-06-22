import {useMutation } from '@tanstack/react-query';
import { useState } from "react";
import type{User} from '../types/Users'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner'
import { GoogleLogin } from "@react-oauth/google";
import { toast } from 'react-hot-toast';

export default function Signup() {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [mail , setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const createUserMutation = useMutation({
        mutationFn: async (user: User) => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/expenses/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        },

        onSuccess: () => {
        }
    });
    
    const googleLoginMutation = useMutation({
        mutationFn: async (credential : string) => {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/expenses/auth/google`,
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    credential,
                }),
            })

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return response.json();
        },
        onSuccess: (data) => {
        localStorage.setItem(
            "token",
            data.token
        );

        toast.success("Sign Up Successful", {
            style: {
                background : "var(--surface)",
                color : "var(--primary)",
                border : "1px solid var(--border)"
            }
        })

        navigate("/");
    },
    onError: (error) => {
        toast.error(error.message, {
            style: {
                background : "var(--surface)",
                color : "var(--primary)",
                border : "1px solid var(--border)"
            }
        })
    }
})



    const handleSumbit = async (e : React.SubmitEvent) => {
        e.preventDefault();

        if(!first || !mail || !password || !confirm){
            toast.error("Invalid Input",{
                style: {
                    background : "var(--surface)",
                    color : "var(--primary)",
                    border : "1px solid var(--border)"
                }
            });
            return;
        }

        if (first.trim().length < 2) {
            toast.error("First name too short",{
                    style: {
                        background : "var(--surface)",
                        color : "var(--primary)",
                        border : "1px solid var(--border)"
                    }
                });
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters",{
                    style: {
                        background : "var(--surface)",
                        color : "var(--primary)",
                        border : "1px solid var(--border)"
                    }
                });
            return;
        }

        if (password !== confirm) {
            toast.error("Passwords do not match", {
                    style: {
                        background : "var(--surface)",
                        color : "var(--primary)",
                        border : "1px solid var(--border)"
                    }
                });
            return;
        }

        const obj : User = {
            id: crypto.randomUUID(),
            first: first,
            last: last,
            mail: mail,
            password: password
        };

        await createUserMutation.mutateAsync(obj);
        setFirst("");
        setLast("");
        setMail("");
        setPassword("");
        setConfirm("");
        
        navigate("/Login")
    };

    return (
        <div className="Login">
            {
            createUserMutation.isPending ?
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
                                <p>Already have an account? <Link to="/login" style={{color:"var(--primary)"}}>Log in</Link></p>
                            </div>
                            <form onSubmit={handleSumbit}>
                                <div className="loginNameField">
                                    <label htmlFor="firstname">First Name
                                        <input 
                                            type="text" 
                                            name="firstname" 
                                            id="firstname"
                                            placeholder="John"
                                            value={first}
                                            onChange={(e) => setFirst(e.target.value)}
                                            maxLength={50}
                                        />
                                    </label>
                                    <label htmlFor="lastname">Last Name
                                        <input 
                                            type="text" 
                                            name="lastname" 
                                            id="lastname" 
                                            placeholder="Doe"
                                            value={last}
                                            onChange={(e) => setLast(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <label htmlFor="email">Email
                                    <input 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        placeholder="xyz@email.com"
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="password">Password
                                    <input 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        placeholder="Enter Your Password"      
                                        value={password}  
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="confirm">Confirm Password
                                    <input 
                                        type="password" 
                                        name="confirm" 
                                        id="confirm" 
                                        placeholder="Repeat your password"        
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                    />
                                </label>
                                <button type="submit" disabled={createUserMutation.isPending}>Create Account</button>
                            </form>
                            <div className="altLogin">
                                <p className="altLoginText">Or Register With</p>
                                <GoogleLogin
                                    onSuccess={(credentialResponse) => {
                                        if (!credentialResponse.credential) return;

                                        googleLoginMutation.mutate(
                                            credentialResponse.credential
                                        );
                                    }}
                                    onError={() => {
                                        console.log("Google Login Failed");
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    );
}
