import './header.scss';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className='header'>
            <nav className='header--navigation'>
                <ul className='header--links'>
                    <li>
                        <NavLink className='header--link' to={'/users'}>Users</NavLink>
                    </li>
                    <li>
                        <NavLink className='header--link' to={'/user-config'}>New User</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;