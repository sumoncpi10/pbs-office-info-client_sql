import './DNPInfo.css';
// import $ from 'jquery';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const KWInfo = () => {
    (function ($) {
        'use strict';
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

    const [user, loading, error] = useAuthState(auth);
    const [book, setBook] = useState([]);
    const [users, SetUsers] = useState([]);
    const [officeInfo, setofficeInfo] = useState([]);
    const today = new Date();
    // const numberOfDaysToAdd = 3;
    const date = today.setDate(today.getDate());
    const defaultValue = new Date(date).toISOString().split('T')[0];
    console.log(defaultValue);
    // const today = new Date(),
    //     date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // useEffect(() => {
    //     fetch(`https://pbsofficeinfo.onrender.com/office?complainCenter=${book?.complainCenter ? book?.complainCenter : book?.zonal}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setofficeInfo(data);
    //         })
    // }, [book]);
    useEffect(() => {
        fetch(`https://pbsofficeinfo.onrender.com/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                SetUsers(data);
            })
    }, [book]);

    const btnSearch = (e) => {
        e.preventDefault();
        const textSearch = e.target.textSearch.value;
        fetch(`https://pbsofficeinfo.onrender.com/book/${textSearch}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBook(data);
            })
    }
    const handleAddDNPInfo = (e) => {
        e.preventDefault();
        // const cdate = e.target.cdate.value;
        // const collectedBy = e.target.collectedBy.value;
        const pbs = e.target.pbs.value;
        const zonal = e.target.zonal.value;
        const complainCenter = e.target.complainCenter.value;
        const month = e.target.month.value;
        const year = e.target.year.value;
        const bookNo = e.target.bookNo.value;
        const numberOfConsumer = e.target.numberOfConsumer.value;
        const empName = e.target.empName.value;
        const empDesignation = e.target.empDesignation.value;
        const kwh = e.target.kwh.value;
        const kwhAmmount = e.target.kwhAmmount.value;
        const enteredBy = user?.email;

        // console.log(name, email, password);
        const product = {
            pbs, zonal, complainCenter, month, year, bookNo, numberOfConsumer, empName, empDesignation, kwh, kwhAmmount, today, enteredBy
        };
        console.log(product);
        // send data to the server

        fetch('https://pbsofficeinfo.onrender.com/KWHAdd', {
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
                setBook("");
                toast("KWH ADD Successfully!");
            })
    }
    const [cdate, setCDate] = useState(new Date());
    return (
        <div className="wrapper wrapper--w680">
            <div className="card card-4">

                <div className="card-body">
                    <h2 className="title">KWH তথ্য</h2>
                    <div className="container-fluid p-2 mb-3">
                        <form onSubmit={btnSearch} className="d-flex" role="search">
                            <input name='textSearch' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary bg-dark" type="submit">Search</button>
                        </form>
                    </div>

                    <form method="POST" onSubmit={handleAddDNPInfo}>
                        {/* <div className="row row-space">
                            <div className="col-2 collapse">
                                <div className="input-group">
                                    <label className="label">পবিসের নাম</label>
                                    <input className="input--style-4" type="email" name="email" />
                                    <select name="pbs" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {book?.pbs == "2902" && <option value='29'>রাঙ্গুনিয়া জোনাল অফিস</option>}
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অফিসের নাম</label>
                                    <input className="input--style-4" type="email" name="email" />
                                    <input type='date'></input>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="">
                                    <DayPicker
                                        mode="single"
                                        selected={cdate}
                                        onSelect={setCDate}
                                    />
                                </div>
                                <p>You Have selected:{format(cdate, 'PP')}</p>
                            </div>
                        </div> */}
                        {/* <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">আদায়ের তারিখ</label>
                                    <input type="date" name="cdate" defaultValue={defaultValue} />
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="label">আদায়কারী</label>
                                <div className="input-group">
                                    <select name="collectedBy" className="" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {
                                            users?.map(u => <option key={u._id} value={u._id}>{u.displayName + ', ' + u.designation}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div> */}
                        <div className="row row-space">
                            <div className="col-2 collapse">
                                <div className="input-group">
                                    <label className="label">পবিসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select name="pbs" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {/* {book?.pbs == "2902" && <option value='29'>রাঙ্গুনিয়া জোনাল অফিস</option>} */}
                                        <option value='29'>চট্টগ্রাম পবিস-২</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অফিসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select name="zonal" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {book?.zonal == "2902" && <option value='2902'>রাঙ্গুনিয়া জোনাল অফিস</option>}
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="label">অভিযোগ কেন্দ্র</label>
                                <div className="input-group">
                                    <select name="complainCenter" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {book?.complainCenter == "290200" && <option value='290200'>রাঙ্গুনিয়া জোনাল অফিস</option>}
                                        {book?.complainCenter == "290201" && <option value='290201'>গোচরা</option>}
                                        {book?.complainCenter == "290202" && <option value='290202'>শিলক</option>}
                                        {book?.complainCenter == "290204" && <option value='290204'>সরবভাটা</option>}
                                        {book?.complainCenter == "290205" && <option value='290205'>লিচুবাগান</option>}
                                        {book?.complainCenter == "290206" && <option value='290206'>পদুয়া</option>}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">মাসের নাম</label>
                                    <select name="month" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {book?.month == "01" && <option value='01'>জানুয়ারী</option>}
                                        {book?.month == "02" && <option value='02'>ফেব্রুয়ারী</option>}
                                        {book?.month == "03" && <option value='03'>মার্চ</option>}
                                        {book?.month == "04" && <option value='04'>এপ্রিল</option>}
                                        {book?.month == "05" && <option value='05'>মে</option>}
                                        {book?.month == "06" && <option value='06'>জুন</option>}
                                        {book?.month == "07" && <option value='07'>জুলাই</option>}
                                        {book?.month == "08" && <option value='08'>আগষ্ট</option>}
                                        {book?.month == "09" && <option value='09'>সেপ্টেম্বর</option>}
                                        {book?.month == "10" && <option value='10'>অক্টোবর</option>}
                                        {book?.month == "11" && <option value='11'>নভেম্বর</option>}
                                        {book?.month == "12" && <option value='12'>ডিসেম্বর</option>}
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="label">বছর</label>
                                <div className="input-group">
                                    <select name="year" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {book?.year == "2022" && <option value='2022'>2022</option>}
                                        {book?.year == "2023" && <option value='2023'>2023</option>}
                                        {book?.year == "2024" && <option value='2024'>2024</option>}
                                        {book?.year == "2025" && <option value='2025'>2025</option>}
                                    </select>
                                    {/* <div className="select-dropdown"></div> */}

                                </div>
                            </div>
                        </div>
                        {/* <div class="row row-space">
                            <div class="col-2">
                                <div class="input-group">
                                    <label class="label">Birthday</label>
                                    <div class="input-group-icon">
                                        <input class="input--style-4 js-datepicker" type="text" name="birthday" />
                                        <i class="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="input-group">
                                    <label class="label">Gender</label>
                                    <div class="p-t-10">
                                        <label class="radio-container m-r-45">Male
                                            <input type="radio" checked="checked" name="gender" />
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="radio-container">Female
                                            <input type="radio" name="gender" />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">বই নং</label>
                                    <input name='bookNo' className="input--style-4" type="text" value={book?.bookNo} disabled required />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">গ্রাহক সংখ্যা</label>
                                    <input name='numberOfConsumer' className="input--style-4" type="text" value={book?.numberOfConsumer} disabled />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">দ্বায়িত্বপ্রাপ্ত কর্মকর্তা/কর্মচারীর নাম</label>
                                    <input className="input--style-4" type="text" name="empName" value={book?.empName} disabled />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">পদবী</label>
                                    <input className="input--style-4" type="text" name="empDesignation" value={book?.empDesignation} disabled />
                                </div>
                            </div>
                        </div>
                        {/* <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি গ্রাহকের সংখ্যা</label>
                                    <input className="input--style-4" type="text" name="numberOfDcConsumer" value={book?.numberOfDcConsumer} disabled />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি গ্রাহকের টাকা</label>
                                    <input className="input--style-4" type="text" name="amountOfDcConsumer" value={book?.amountOfDcConsumer} disabled />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">৯০ দিনের উর্ধ্বে গ্রাহক সংখ্যা(মাসের শুরুতে)</label>
                                    <input className="input--style-4" type="text" name="Days90UpConsumerMonthStart" value={book?.Days90UpConsumerMonthStart} disabled />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">৯০ দিনের উর্ধ্বে গ্রাহক সংখ্যা(মাসের শেষে)</label>
                                    <input className="input--style-4" type="text" name="Days90UpConsumerMonthEnd" value={book?.Days90UpConsumerMonthEnd} disabled />
                                </div>
                            </div>
                        </div> */}
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">কিলোওয়াট</label>
                                    <input className="input--style-4" type="text" name="kwh" required />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">টাকা</label>
                                    <input className="input--style-4" type="text" name="kwhAmmount" required />
                                </div>
                            </div>
                        </div>
                        {/* <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অন্যান্য আদায় সংখ্যা</label>
                                    <input className="input--style-4" type="text" name="NumOfOtherCollection" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অন্যান্য আদায় টাকা</label>
                                    <input className="input--style-4" type="text" name="AmmountOfOtherCollection" />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি সংখ্যা</label>
                                    <input className="input--style-4" type="text" name="NumOfDC" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি টাকা</label>
                                    <input className="input--style-4" type="text" name="AmmountOfDC" />
                                </div>
                            </div>
                        </div> */}

                        <div className="p-t-15">
                            <button className="btn btn--radius-2 btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default KWInfo;
