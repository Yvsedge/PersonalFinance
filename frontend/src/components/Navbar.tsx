import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

type userInfo = {
    name : {
        firstname: string,
        lastname: string,
        email: string,
    }
};


const fetchMe = async (): Promise<userInfo> => {
        const token = localStorage.getItem("token");
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/expenses/getme`,
            {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }
        );

        if (!res.ok) {
            throw new Error("Failed to fetch");
        }

        return res.json();
    };

const message = (name : string) => {
    if(name === "") return;
    toast.promise(fetchMe, {
        loading: "",
        success: `Welcome Back ${name}!`,
    }, {
        style: {
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            background: "var(--surface)",
            color: "var(--primary)"
        }
    })
}

export default function Navbar() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");

        queryClient.clear();

        navigate("/login");
    };

    const { data } = useQuery({
        queryKey: ["me"],
        queryFn: fetchMe
    });
    
    useEffect(() => {
         message(data?.name.firstname ?? "");
    }, [data?.name.firstname])
    

    useEffect(() => {
        const savedTheme =
            (localStorage.getItem('theme') as 'light' | 'dark') || 'light';

        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
       
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <nav>
            <span className="Title">PFT</span>

            <ul>
                <li>
                    <span style={{color:"var(--primary)"}}>{data?.name.firstname}</span>
                </li>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'activeLink' : ''
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/transactions"
                        className={({ isActive }) =>
                            isActive ? 'activeLink' : ''
                        }
                    >
                        Transactions
                    </NavLink>
                </li>

                <li>
                    <input
                        type="checkbox"
                        id="theme-toggle"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        className="theme-toggle"
                    />

                    <label htmlFor="theme-toggle" className="theme-icon">
                        {theme === 'dark' ? <IoSunny></IoSunny> : <IoMoon></IoMoon>}
                    </label>
                </li>
                <li>
                    <button onClick={logout}>
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
}
