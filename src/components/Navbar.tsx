import {NavLink} from 'react-router-dom'

export default function Navbar() {
    return (
        <nav>
            <span className="Title">PFT</span>
            <ul>
                <li>
                    <NavLink 
                        to={"/"}
                        className={({ isActive }) =>
                            isActive ? "activeLink" : ""
                        }>
                            Dashboard
                        </NavLink>
                    </li>
                <li>
                    <NavLink 
                        to={"/transactions"}
                        className={({ isActive }) =>
                            isActive ? "activeLink" : ""
                        }>
                            Transactions
                        </NavLink>
                    </li>
            </ul>
        </nav>
    );
}
