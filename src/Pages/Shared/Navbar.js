import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
// import logo from '../../assets/images/ATZ-modified-removebg-preview.png';
import auth from '../../firebase.init';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    // console.log(user);
    const manuItems = <>
        <li><Link to='/'>Home</Link></li>

        <li tabIndex="0">
            <Link to='/products'>Products</Link>
            <ul className="p-2">
                <li className="btn btn-primary" data-filter=".gts"><Link to='/products/hand'>Hand Tools</Link></li>
                <li className="btn btn-primary" data-filter=".lap"><Link to='/products/tour'>Cutting Tools</Link></li>
                <li className="btn btn-primary" data-filter=".lap"><Link to='/products/fashion'>Industrial Tools</Link></li>
                <li className="btn btn-primary" data-filter=".lap"><Link to='/products/fashion'>Precision Tools</Link></li>
            </ul>
        </li>
        {
            user && <li><Link to='/dashboard'>Dashboard</Link></li>
        }

        <li><Link to='/testimonials'>Review</Link></li>
        <li><Link to='/business'>Business</Link></li>
        {/* <li><Link to='/contact'>Contact</Link></li> */}
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/portfolio'>My Portfolio</Link></li>
        <li><Link to='/blogs'>Blogs</Link></li>
    </>;

    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    };

    return (
        <div className="navbar bg-base-100 px-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {manuItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">
                    {/* <img src={logo} alt="ATZ Logo" className='h-10 w10' /> Tools Manufacturing */}
                </a>
            </div>
            {/* <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {manuItems}
                </ul>
            </div> */}

            {
                !user ?
                    <div className="navbar-end">
                        <Link to='/login' className='btn'>Login</Link>
                        <Link to='/signup' className='btn btn-primary mx-2'>SignUp</Link>
                    </div>
                    :

                    <div className='navbar-end'>

                        <div className="flex-none ">
                            <div className="dropdown dropdown-end">
                                <label tabIndex="0" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge badge-sm indicator-item">8</span>
                                    </div>
                                </label>
                                <div tabIndex="0" className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
                                    <div className="card-body">
                                        <span className="font-bold text-lg">8 Items</span>
                                        <span className="text-info">Subtotal: $999</span>
                                        <div className="card-actions">
                                            <button className="btn btn-primary btn-block">View cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown dropdown-end">
                                <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL ? user?.photoURL : "https://api.lorem.space/image/face?hash=33791"} />
                                    </div>
                                </label>
                                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <a className="justify-between">
                                            {user?.displayName}
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><a onClick={logout}>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
            }
        </div>


    );
};

export default Navbar;