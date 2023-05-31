import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Shared/Header';

const NotFound = () => {
    return (
        <div>
            <div className="wrapper">


                <div className="preloader-wrap">
                    <div className="preloader">
                        <div className="dog-head"></div>
                        <div className="dog-body"></div>
                    </div>
                </div>
                <Header></Header>

                <main className="main-content">
                    <div className="page-header-area" style={{ "backgroundImage": "url(/assets/img/photos/bg1.webp)" }} >
                        <div className="container pt--0 pb--0">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-header-content">
                                        <h2 className="title">404 Page Not Found</h2>
                                        <nav className="breadcrumb-area">
                                            <ul className="breadcrumb">
                                                <li><Link to="/">Home</Link></li>
                                                <li className="breadcrumb-sep">//</li>
                                                <li></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className='text-4xl text-red-400 text-center'>404</h1>
                    <h1 className='text-4xl text-blue-500 text-center'>Page Not Found</h1>
                </main >
            </div>
        </div>
    );
};

export default NotFound;