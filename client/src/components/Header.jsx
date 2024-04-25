import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../security/authContext"

export default function Header() {
    const authContext = useAuth();
    const navigate = useNavigate();
    const isAuthenticated = authContext.authenticated();
    const isAdmin = authContext.admin();
    function logout() {
        authContext.logout();
        window.location.href = '/';

    }
    return (
        <header className='border-bottom p-2'>
            <div className='container'>
                <div className='row'>
                    <nav className='navbar navbar-expand-lg'>
                        <p className='navbar-brand ms2 fs-2 fw-bold text-black'>Library Management System</p>
                        <div className='collapse navbar-collapse'>
                            <ul className='navbar-nav'>
                                <li className='nav-item'>
                                    {isAuthenticated && !isAdmin && <Link className='nav-link mx-2' to="/home">Home</Link>}
                                    {isAuthenticated && isAdmin && <Link className='nav-link mx-2' to="/all-book">Books</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && !isAdmin && <Link className='nav-link mx-2' to="/user-books">Books</Link>}
                                    {isAuthenticated && isAdmin && <Link className='nav-link mx-2' to="/requests">Requests</Link>}
                                </li>
                                <li className='nav-item'>
                                    {isAuthenticated && !isAdmin && <Link className='nav-link mx-2' to="/bookshelf">My Bookshelf</Link>}
                                </li>
                            </ul>
                        </div>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                {isAuthenticated && <Link className='nav-link mx-2' to='/notifications' >Notification</Link>}
                            </li>
                            <li className='nav-item'>
                                {!isAuthenticated && <Link className='nav-link mx-2' to='/login' >Login</Link>}
                                {isAuthenticated && <Link className='nav-link mx-2' to='/profile' >Profile</Link>}
                            </li>
                            <li className='nav-item'>
                                {!isAuthenticated && <Link className='nav-link mx-2' to='/signup' >Signup</Link>}
                                {isAuthenticated && <p className='btn nav-link mx-2' onClick={logout}>Logout</p>}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}