type Props = {
};
import { FcGoogle } from "react-icons/fc";
import {useMutation } from '@tanstack/react-query';
import { useState } from "react";
import type{User} from '../types/Users'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from '../components/Spinner'

export default function Signup({}: Props) {
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



    const handleSumbit = async (e : React.SubmitEvent) => {
        e.preventDefault();

        if(password !== confirm){
            alert("Passwords do not match");
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
                                <p>Already have an account? <Link to="/login">Log in</Link></p>
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
                                <button type="submit">Create Account</button>
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
