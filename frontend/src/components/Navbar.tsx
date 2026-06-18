import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";


export default function Navbar() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
            </ul>
        </nav>
    );
}
