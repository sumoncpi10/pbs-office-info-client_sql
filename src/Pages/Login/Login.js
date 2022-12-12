import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
const Login = ({ setuserV }) => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
    );
    const [
        signInWithEmailAndPassword, inUser

    ] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        fetch(`https://pbsofficeinfo.onrender.com/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data);
            })
    }, []);

    if (inUser) {
        navigate(from, { replace: true });
        return (
            <div>
                <p>Signed In User: {inUser.email}</p>
            </div>
        );
    }
    const btnUserCreate = async (e) => {
        e.preventDefault();
        const r = await signInWithGoogle();
        console.log(r.user)
        if (await r) {
            const newuser = await users?.find(user => user.email == r.user.email)
            console.log(newuser);
            if (newuser) {
                toast("Signed in Successfully!");
                navigate(from, { replace: true });
            }
            else {
                fetch('https://pbsofficeinfo.onrender.com/userAdd', {
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
    const actionCodeSettings = {
        url: 'http://localhost:3000/login',
    };

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
                                        <input onChange={(e) => setEmail(e.target.value)} name='email' type="text" className="form-control rounded-left" placeholder="Username" required />
                                    </div>
                                    <div className="form-group d-flex">
                                        <input onChange={(e) => setPassword(e.target.value)} name='password' type="password" className="form-control rounded-left" placeholder="Password" required />
                                    </div>

                                    <div className="form-group d-flex justify-content-between">
                                        <div className="">
                                            <button className="checkbox-wrap checkbox-primary"
                                                onClick={async () => {
                                                    const success = await sendPasswordResetEmail(email, actionCodeSettings
                                                    );
                                                    if (success) {
                                                        toast('Go to Your Gmail to get Password Reset Link');
                                                    }
                                                }}
                                            >
                                                Forgot Password?
                                            </button>
                                        </div>
                                        <div class="">
                                            {/* <a href="#"></a>  */}
                                            <Link to="/signup">Sign Up</Link>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button onClick={() => signInWithEmailAndPassword(email, password)} type="button" className="btn btn-primary fs-5 px-5 w-100">Login</button>
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