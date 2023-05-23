import './DNPInfo.css';
// import $ from 'jquery';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const DNPInfo = () => {
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

    // const [zonals, setZonals] = useState([]);
    const [officeInfo, setofficeInfo] = useState([]);
    const today = new Date();
    // const numberOfDaysToAdd = 3;
    const date = today.setDate(today.getDate());
    const defaultValue = new Date(date).toISOString().split('T')[0];
    // console.log(defaultValue);
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
        fetch(`https://pbsofficeinfosql.onrender.com/users`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                SetUsers(data);

            })
    }, [book]);

    const btnSearch = (e) => {
        e.preventDefault();
        const textSearch = e.target.textSearch.value;
        fetch(`https://pbsofficeinfosql.onrender.com/book/${textSearch}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBook(data[0]);
            })
    }
    const handleAddDNPInfo = (e) => {
        e.preventDefault();
        const bookNo = e.target.bookNo.value;
        const pbs_code = e.target.pbs_code.value;
        const zonal_code = e.target.zonal_code.value;
        const cc_code = e.target.cc_code.value;
        const NumOfCashCollection = e.target.NumOfCashCollection.value;
        const AmountOfCashCollection = e.target.AmountOfCashCollection.value;
        const NumOfOtherCollection = e.target.NumOfOtherCollection.value;
        const AmmountOfOtherCollection = e.target.AmmountOfOtherCollection.value;
        const NumOfDC = e.target.NumOfDC.value;
        const AmmountOfDC = e.target.AmmountOfDC.value;
        const assign_to = e.target.assign_to.value;
        const collected_by = e.target.collected_by.value;
        const cdate = e.target.cdate.value;
        const entered_by = user?.email;
        // console.log(name, email, password);
        const product = {
            bookNo, pbs_code, zonal_code, cc_code, NumOfCashCollection, AmountOfCashCollection, NumOfOtherCollection, AmmountOfOtherCollection, NumOfDC, AmmountOfDC, assign_to, collected_by, cdate, today, entered_by
        };
        console.log(product);
        // send data to the server

        fetch('https://pbsofficeinfosql.onrender.com/cashAdd', {
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
                toast("DNP Update Successfully!");
            })
    }
    const [cdate, setCDate] = useState(new Date());

    return (
        <div className="wrapper wrapper--w680">
            <div className="card card-4">

                <div className="card-body">
                    <h2 className="title">বকেয়া আদায়ের তথ্য</h2>
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
                                        defaultValue={cdate}
                                        onSelect={setCDate}
                                    />
                                </div>
                                <p>You Have defaultValue:{format(cdate, 'PP')}</p>
                            </div>
                        </div> */}
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">আদায়ের তারিখ</label>
                                    <input type="date" name="cdate" defaultValue={defaultValue} />
                                </div>
                            </div>
                            <div className="col-2 ">
                                <div className="input-group">
                                    <label className="label">পবিসের নাম</label>
                                    <select name="pbs_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='29'>Chittagong PBS-2</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="row row-space">

                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অফিসের নাম</label>
                                    <select name="zonal_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value={book.zonal_code}>{book.zonal_name}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="label">অভিযোগ কেন্দ্র</label>
                                <div className="input-group">
                                    <select name="cc_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value={book.cc_code}>{book.cc_name}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
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
                                    <label className="label">দ্বায়িত্বপ্রাপ্ত কর্মকর্তা/কর্মচারী</label>
                                    <select name="assign_to" className="" style={{ "width": "250px", "lineHeight": "50px" }}>
                                        <option value={book.assign_to}>{book.displayName},{book.designation}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="label">আদায়কারী</label>
                                <div className="input-group">
                                    <select name="collected_by" className="" style={{ "width": "250px", "lineHeight": "50px" }}>
                                        {
                                            users.map(u => <option key={u.id} defaultValue={u.trg_id == book.assign_to} value={u.id}>{u.displayName}, {u.designation}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">নগদ আদায় সংখ্যা</label>
                                    <input className="input--style-4" type="text" name="NumOfCashCollection" required />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">নগদ আদায় টাকা</label>
                                    <input className="input--style-4" type="text" name="AmountOfCashCollection" required />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অন্যান্য আদায় সংখ্যা</label>
                                    <input className="input--style-4" type="text" name="NumOfOtherCollection" required />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অন্যান্য আদায় টাকা</label>
                                    <input className="input--style-4" type="text" name="AmmountOfOtherCollection" required />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি সংখ্যা</label>
                                    <input className="input--style-4" type="text" name="NumOfDC" required />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি টাকা</label>
                                    <input className="input--style-4" type="text" name="AmmountOfDC" required />
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
