import React, { useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
const Login = ({ setuserV }) => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    if (user) {
        console.log(user);
        navigate(from, { replace: true });
        // navigate('/');
    }
    if (error) {
        toast('Opps !!!!!!! There is An Error!!!');
    }
    return (
        <div className='container'>

            <section className="ftco-section">
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user-o"></span>
                                </div>
                                <h3 className="text-center mb-4">Have an account?</h3>
                                <form method='post' className="login-form">
                                    <div className="form-group">
                                        <input name='email' type="text" className="form-control rounded-left" placeholder="Username" required />
                                    </div>
                                    <div className="form-group d-flex">
                                        <input name='password' type="password" className="form-control rounded-left" placeholder="Password" required />
                                    </div>
                                    <div className="form-group d-md-flex">
                                        {/* <div className="w-50">
                                            <label className="checkbox-wrap checkbox-primary">Forgot Password
                                                <input type="checkbox" checked />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div> */}
                                        <div className="w-50 ">
                                            <a href="#">Forgot Password?</a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary fs-5 px-5 w-100">Login</button>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-secondary w-100" onClick={() => signInWithGoogle()}>Continue With Google</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};

export default Login;