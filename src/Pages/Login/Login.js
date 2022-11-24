import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
const Login = ({ setuserV }) => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [userG] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    if (user) {
        // console.log(user);
        // navigate('/');
        navigate(from, { replace: true });
    }
    if (error) {
        toast('Opps !!!!!!! There is An Error!!!');
    }
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data);

            })
    }, []);
    const btnUserCreate = async (e) => {
        e.preventDefault();
        const r = await signInWithGoogle();
        console.log(r.user)
        if (await r) {
            const newuser = await users?.find(user => user.uid == r.user.uid)
            console.log(newuser)
            if (newuser) {
                toast("Signed in Successfully!");
                navigate(from, { replace: true });
            }
            else {
                fetch('http://localhost:5000/userAdd', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(r?.user)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log('success', data);
                        toast("User Create Successfully!");
                        navigate(from, { replace: true });
                    })
            }

        }
    }
    return (
        <div className='container'>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <FontAwesomeIcon icon={faUserAlt} />
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
                                        <button className="btn btn-secondary w-100" onClick={btnUserCreate}>Continue With Google</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </div >
            </section >

        </div >
    );
};

export default Login;