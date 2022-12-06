import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";


const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    // console.log(user);
    const logout = () => {
        signOut(auth);
        // localStorage.removeItem('accessToken');
    };
    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Office Info</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Info Entry
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/dnp-info">DNP Information</Link></li>
                                {/* <li><Link className="dropdown-item" to="/">Another action</Link></li> */}
                                {/* <li><hr className="dropdown-divider" /></li> */}
                                {/* <li><Link className="dropdown-item" to="/">Something else here</Link></li> */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Report
                            </Link>
                            <ul className="dropdown-menu">

                                <li><Link className="dropdown-item" to="/collection-info-report">আদায়ের তথ্য</Link></li>
                                {/* <li><Link className="dropdown-item" to="/dnp-info-report">বকেয়ার তথ্য</Link></li> */}
                                {/* <li><hr className="dropdown-divider" /></li> */}
                                {/* <li><Link className="dropdown-item" to="/">Something else here</Link></li> */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Admin
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/books">Manage Books</Link></li>
                                <li><Link className="dropdown-item" to="/users">Manage Users</Link></li>
                                {/* <li><Link className="dropdown-item" to="/offices">Manage Office</Link></li> */}
                                {/* <li><hr className="dropdown-divider" /></li> */}
                                {/* <li><Link className="dropdown-item" to="/">Something else here</Link></li> */}
                            </ul>
                        </li>
                        <li className="nav-item">
                            {/* <Link className="nav-link disabled">Disabled</Link> */}
                        </li>
                    </ul>
                    {
                        !user ?
                            <div className="d-flex">
                                <Link to='/login' className='btn btn-primary'>Login</Link>
                                <Link to='/signup' className='btn btn-secondary'>Sign Up</Link>
                                {/* <Link to='/signup' className='btn btn-primary mx-2'>SignUp</Link> */}
                            </div>
                            :
                            <div className="flex-shrink-0 dropdown">
                                <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
                                    <img src={user.photoURL ? user.photoURL : "https://api.lorem.space/image/face?hash=33791"} alt="mdo" width="32" height="32" className="rounded-circle" />
                                </a>
                                <ul className=" dropdown-menu text-small shadow collapse" data-popper-placement="bottom-end" style={{ "position": "absolute", "inset": "0px 0px auto auto", "margin": "0px", "transform": "translate(0px, 34px)" }}>
                                    <li >
                                        <button className="d-flex justify-content-between  ">{user?.displayName}</button>
                                    </li>
                                    <hr></hr>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" onClick={logout}>Sign out</a></li>
                                </ul>
                            </div>
                    }
                </div>
            </div>

        </nav>
    );
}

export default Header;
