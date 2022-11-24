import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../Users/Users';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import User from '../Users/User';
const Offices = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data);

            })
    }, []);
    const ok = (e) => {
        e.preventDefault();
        (function ($) {
            "use strict";
            $('[data-toggle="tooltip"]').tooltip()
            $('#exampleModalCenter').modal('show')
        })(window.jQuery);
    }
    const cancel = (e) => {
        e.preventDefault();
        (function ($) {
            "use strict";
            $('[data-toggle="tooltip"]').tooltip()
            $('#exampleModalCenter').modal('hide')
        })(window.jQuery);
    }

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    if (user) {
        console.log(user);
        navigate(from, { replace: true });
        {
            toast(`Registered User: ${user.user.email}`)
        };
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    else if (error) {
        return (
            <div>
                {
                    toast(error?.message)
                };
            </div>
        );
    }
    const createOffice = async (e) => {
        e.preventDefault();
        const pbs = e.target.name.value;
        const zonal = e.target.designation.value;
        const complainCenter = e.target.email.value;
        const office = {
            pbs, zonal, complainCenter
        };

        fetch('http://localhost:5000/ComplainofficeAdd', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(office)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('success', data);
                toast("Office Add Successfully!");
                e.target.reset();
                // navigate(from, { replace: true });
            })

    }

    return (
        <div>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button onClick={cancel} type="button" className="close d-flex align-items-center justify-content-center" data-dismiss="modal" aria-label="Close">
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        </div>
                        <div className="row">

                            <div className="col-md">
                                <div className="modal-body p-0">
                                    <h3 className="mb-4">Create New Office</h3>
                                    <form onSubmit={createOffice} className="signup-form">
                                        <div className="form-group">
                                            <input name="pbs" type="text" className="form-control" placeholder="Name" required />
                                        </div>
                                        <div className="form-group">
                                            <input name='zonal' type="text" className="form-control" placeholder="Designation" required />
                                        </div>
                                        <div className="form-group">
                                            <input name='complainCenter' type="text" className="form-control" placeholder="Email address" required />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="form-control btn btn-primary rounded submit px-3">Create</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <h5 className="card-title">Contact List <span className="text-muted fw-normal ms-2">(834)</span></h5>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                            <div>
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <a
                                            aria-current="page"
                                            href="#"
                                            className="router-link-active router-link-exact-active nav-link active"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title=""
                                            data-bs-original-title="List"
                                            aria-label="List"
                                        >
                                            <i className="bx bx-list-ul"></i>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Grid" aria-label="Grid"><i className="bx bx-grid-alt"></i></a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Link to="/addUser" data-bs-toggle="modal" data-bs-target=".add-new" className="btn btn-primary" hidden><i className="bx bx-plus me-1"></i> Add New</Link>
                                <button onClick={ok} className="btn btn-primary"><i className="bx bx-plus me-1"></i> Add New</button>
                            </div>
                            <div className="dropdown">
                                <a className="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bx bx-dots-horizontal-rounded"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="">
                            <div className="table-responsive">
                                <table className="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="ps-4" style={{ "width": "50px" }}>
                                                <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck" /><label className="form-check-label" htmlFor="contacusercheck"></label></div>
                                            </th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Position</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Projects</th>
                                            <th scope="col" style={{ "width": "200px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users?.map(user => <User user={user} key={user._id}></User>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-0 align-items-center pb-4">
                    <div className="col-sm-6">
                        <div><p className="mb-sm-0">Showing 1 to 10 of 57 entries</p></div>
                    </div>
                    <div className="col-sm-6">
                        <div className="float-sm-end">
                            <ul className="pagination mb-sm-0">
                                <li className="page-item disabled">
                                    <a href="#" className="page-link"><i className="mdi mdi-chevron-left"></i></a>
                                </li>
                                <li className="page-item active"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                <li className="page-item"><a href="#" className="page-link">5</a></li>
                                <li className="page-item">
                                    <a href="#" className="page-link"><i className="mdi mdi-chevron-right"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offices;