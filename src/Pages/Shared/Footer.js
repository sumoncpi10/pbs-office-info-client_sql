import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer-area">

            {/* <div className="footer-main">
                <div className="container pt--0 pb--0">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="widget-item widget-about">
                                <h4 className="widget-title">About Us</h4>
                                <p className="desc">Lorem ipsum dolor sit amet, consectel adipisicing elit, sed do eiusmod temp incidid ut
                                    labore et dolo</p>
                                <div className="social-icons">
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener"><i className="fa fa-facebook"></i></a>
                                    <a href="https://dribbble.com/" target="_blank" rel="noopener"><i className="fa fa-instagram"></i></a>
                                    <a href="https://www.pinterest.com/" target="_blank" rel="noopener"><i
                                        className="fa fa-pinterest-p"></i></a>
                                    <a href="https://twitter.com/" target="_blank" rel="noopener"><i className="fa fa-twitter"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="widget-item nav-menu-item1">
                                <h4 className="widget-title">Information</h4>
                                <h4 className="widget-collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#widgetId-1">Our
                                    Policy</h4>
                                <div id="widgetId-1" className="collapse widget-collapse-body">
                                    <div className="collapse-body">
                                        <div className="widget-menu-wrap">
                                            <ul className="nav-menu">
                                                <li><Link to="/about-us">About Us</Link></li>
                                                <li><Link to="/disclaimer">Privacy Policy</Link></li>
                                                <li><Link to="/disclaimer">Disclaimer</Link></li>
                                                <li><Link to="/contact">Contact Us</Link></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="widget-item">
                                <h4 className="widget-title">Contact Info:</h4>
                                <h4 className="widget-collapsed-title collapsed" data-bs-toggle="collapse" data-bs-target="#widgetId-3">
                                    Contact Info:</h4>
                                <div id="widgetId-3" className="collapse widget-collapse-body">
                                    <div className="collapse-body">
                                        <div className="widget-contact-info">
                                            <p className="contact-info-desc">If you have any question.please contact us at <a
                                                href="mailto://dogpotluck@gmail.com">dogpotluck@gmail.com</a></p>
                                            <div className="contact-item">
                                                <div className="icon">
                                                    <i className="pe-7s-map-marker"></i>
                                                </div>
                                                <div className="info">
                                                    <p>36-20 Summers Place <br />Saskatoon, SK, Canada.</p>
                                                </div>
                                            </div>
                                            <div className="contact-item phone-info">
                                                <div className="icon">
                                                    <i className="pe-7s-phone"></i>
                                                </div>
                                                <div className="info">
                                                    <p><span>Have any Question</span> <br /><a href="tel://+1 639 318 3375">+1 639 318 3375</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="footer-bottom">
                <div className="container pt--0 pb--0">
                    <div className="row">
                        <div className="col-12">
                            <div className="footer-bottom-content d-flex">
                                <p className="mx-auto" >© 2022 PBS Office Information. Made with <i className="fa fa-heart"></i> by <a target="_blank"
                                    className='text-white' href="#">Md. Daduggaman Sumon, JE(IT), Chittagong PBS-2</a></p>
                                {/* <div className="payment">
                                    <Link to="/"><img src="assets/img/logo-light.webp" width="192" height="21"
                                        alt="Payment Logo" /></Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;