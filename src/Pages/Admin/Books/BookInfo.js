import '../../InfoEntry/DNPInfo';
// import $ from 'jquery';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const DNPInfo = () => {

    (function ($) {
        'use strict';
        /*==================================================================
            [ Daterangepicker ]*/
        // try {

        //     $('.js-datepicker').daterangepicker({
        //         "singleDatePicker": true,
        //         "showDropdowns": true,
        //         "autoUpdateInput": false,
        //         locale: {
        //             format: 'DD/MM/YYYY'
        //         },
        //     });

        //     var myCalendar = $('.js-datepicker');
        //     var isClick = 0;

        //     $(window).on('click', function () {
        //         isClick = 0;
        //     });

        //     $(myCalendar).on('apply.daterangepicker', function (ev, picker) {
        //         isClick = 0;
        //         $(this).val(picker.startDate.format('DD/MM/YYYY'));

        //     });

        //     $('.js-btn-calendar').on('click', function (e) {
        //         e.stopPropagation();

        //         if (isClick === 1) isClick = 0;
        //         else if (isClick === 0) isClick = 1;

        //         if (isClick === 1) {
        //             myCalendar.focus();
        //         }
        //     });

        //     $(myCalendar).on('click', function (e) {
        //         e.stopPropagation();
        //         isClick = 1;
        //     });

        //     $('.daterangepicker').on('click', function (e) {
        //         e.stopPropagation();
        //     });


        // } catch (er) { console.log(er); }
        // /*[ Select 2 Config ]
        //     ===========================================================*/

        try {
            var selectSimple = $('.js-select-simple');

            selectSimple.each(function () {
                var that = $(this);
                var selectBox = that.find('select');
                var selectDropdown = that.find('.select-dropdown');
                selectBox.select2({
                    dropdownParent: selectDropdown
                });
            });

        } catch (err) {
            console.log(err);
        }
    })(window.jQuery);

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                console.log(data);

            })
    }, []);
    const handleAddDNPInfo = (e) => {
        e.preventDefault();

        const pbs_code = e.target.pbs.value;
        const zonal_code = e.target.zonal.value;
        const cc_code = e.target.complainCenter.value;
        const bookNo = e.target.bookNo.value;
        const numberOfConsumer = e.target.numberOfConsumer.value;
        const numberOfDcConsumer = e.target.numberOfDcConsumer.value;
        const assign_to = e.target.assign_to.value;

        const kw = e.target.kw.value;

        const add_by = user?.email;

        // console.log(name, email, password);
        const product = {
            pbs_code, zonal_code, cc_code, bookNo, bookNo, numberOfConsumer, numberOfDcConsumer, assign_to, kw, add_by
        };
        console.log(product);
        // send data to the server

        fetch('http://localhost:5000/dnpBookAdd', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('success', data);
                e.target.reset();
                toast("Book Add Successfully!");
            })
    }
    const [user, loading, error] = useAuthState(auth);
    return (
        <div className="wrapper wrapper--w680">
            <div className="card card-4">

                <div className="card-body">
                    <h2 className="title">বই এর তথ্য</h2>
                    <div className="container-fluid p-2 mb-3">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary bg-dark" type="submit">Search</button>
                        </form>
                    </div>

                    <form method="POST" onSubmit={handleAddDNPInfo}>
                        <div className="row row-space">
                            <div className="col-2 ">
                                <div className="input-group">
                                    <label className="label">পবিসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select name="pbs" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='29'>চট্টগ্রাম পবিস-২</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অফিসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select name="zonal" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='2902'>রাঙ্গুনিয়া জোনাল অফিস</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div className="row row-space">
                            <div className="col-2">
                                <label className="label">অভিযোগ কেন্দ্র</label>
                                <div className="input-group">
                                    <select name="complainCenter" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='290200'>রাঙ্গুনিয়া জোনাল অফিস</option>
                                        <option value='290205'>লিচুবাগান</option>
                                        <option value='290206'>পদুয়া</option>
                                        <option value='290204'>সরবভাটা</option>
                                        <option value='290201'>গোচরা</option>
                                        <option value='290202'>শিলক</option>
                                    </select>
                                    {/* <div className="select-dropdown"></div> */}

                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">বই নং</label>
                                    <input name='bookNo' className="input--style-4" type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="row row-space">

                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">গ্রাহক সংখ্যা</label>
                                    <input name='numberOfConsumer' className="input--style-4" type="text" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি গ্রাহকের সংখ্যা</label>
                                    <input className="input--style-4" type="text" name="numberOfDcConsumer" />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">কিলোওয়াট</label>
                                    <input className="input--style-4" type="text" name="kw" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">দ্বায়িত্বপ্রাপ্ত কর্মকর্তা/কর্মচারীর নাম</label>
                                    <select name="assign_to" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {
                                            users.map(u => <option value={u.trg_id}>{u.displayName}, {u.designation}</option>)
                                        }

                                    </select>
                                    {/* <input className="input--style-4" type="text" name="assign_to" /> */}
                                </div>
                            </div>

                        </div>



                        <div className="p-t-15">
                            <button className="btn btn--radius-2 btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default DNPInfo;
