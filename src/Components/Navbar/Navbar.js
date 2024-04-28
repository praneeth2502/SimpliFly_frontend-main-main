import './Navbar.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from "./Images/logo.png";

function CustomNavbar() {
    var isLoggedIn = sessionStorage.getItem("token")
    var navigate = useNavigate()

    function Home() {
        if (sessionStorage.getItem('role') === 'admin') {
            navigate("/admin/home");
        } else if (sessionStorage.getItem("role") === "flightOwner") {
            navigate("/flightOwner/home");
        } else {
            navigate('/home')
        }
    }

    var Logout = () => {
        const confirmDelete = window.confirm(`Are you sure you want to Logout?`);
        if (confirmDelete) {
            sessionStorage.removeItem("username")
            sessionStorage.removeItem("role")
            sessionStorage.removeItem("userId")
            sessionStorage.removeItem("token")
            navigate('/')
        }

    }

    return (
        <>
            <nav className="navbar bg-custom fixed-top" id="navbar-main">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="Simply FLY Logo"
                            style={{ marginRight: '10px' }}
                        />
                        <span className="brand-text smaller"style={{ fontWeight: 'bold', color: 'white' }}>SIMPLYFLY</span>
                    </a>
                    <div style={{ marginRight: '-150px' }}>
                    <ul className="navbar-nav nav-links">
                        <li className="nav-item">
                            <a className="nav-link home-btn" onClick={Home}>Home</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        {!isLoggedIn && (<li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>)}
                        {isLoggedIn && (<li className="nav-item">
                            <Link className="nav-link" to="/user/userAccount">Account</Link>
                        </li>)}
                        {isLoggedIn && (<li className="nav-item">
                            <a className="nav-link logout-btn" onClick={Logout}>Logout</a>
                        </li>)}
                    </ul>
                    </div>
                    <button className="navbar-toggler link-btn" type="button" onClick={() => navigate('/navMenu')} id="menu-btn" style={{ color: 'white' }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Outlet />
                </div>
            </nav>
        </>
    );
}

export default CustomNavbar;
